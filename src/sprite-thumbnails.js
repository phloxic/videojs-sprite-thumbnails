import videojs from 'video.js';
import window from 'global/window';

/**
 * Set up sprite thumbnails for a player.
 *
 * @function spriteThumbs
 * @param {Player} player
 *        The current player instance.
 * @param {Plugin} plugin
 *        The current spriteThumbnails plugin instance.
 * @param {Object} options
 *        Plugin configuration options.
 */
const spriteThumbs = (player, plugin, options) => {
  const navigator = window.navigator;

  const dom = videojs.dom;
  const obj = videojs.obj;
  const log = plugin.log;
  const debug = log.debug;

  const defaultState = { ...plugin.state };
  const setDefaultState = () => {
    plugin.setState(defaultState);
  };

  // default control bar component tree is expected
  // https://docs.videojs.com/tutorial-components.html#default-component-tree
  const descendants = [
    'ControlBar',
    'ProgressControl',
    'SeekBar',
    'MouseTimeDisplay',
    'TimeTooltip'
  ];
  const [
    _controlBar,
    _progressControl,
    _seekBar,
    // MouseTimeDisplay unused
    _timeTooltip
  ] = descendants.toSpliced(3, 1);

  const playerDescendant = componentName => {
    const idx = descendants.indexOf(componentName);
    const component = player.getDescendant(descendants.slice(0, idx + 1));

    if (!component) {
      setDefaultState();
      debug(`component tree ${descendants.join(' > ')} required`);
    }
    return component;
  };

  let tooltipEl;
  let tooltipStyleOrig;

  const getUrl = idx => {
    const urlArray = options.urlArray;

    return urlArray.length ?
      urlArray[idx] : options.url.replace('{index}', options.idxTag(idx));
  };

  const hijackMouseTooltip = evt => {
    if (!playerDescendant(_timeTooltip)) {
      return;
    }
    const seekBarEl = playerDescendant(_seekBar).el();
    const controlsTop = dom
      .findPosition(playerDescendant(_controlBar).el()).top;
    const playerWidth = player.currentWidth();
    const duration = player.duration();
    const interval = options.interval;
    const columns = options.columns;
    const responsive = options.responsive;

    const rowDuration = interval * columns;
    // spriteDuration is needed to calculate idx
    const spriteDuration = rowDuration *
          (options.rows || Math.ceil(duration / rowDuration));

    let position = dom.getPointerPosition(seekBarEl, evt).x * duration;
    // for single sprites idx is always 0
    const idx = Math.floor(position / spriteDuration);

    // if (idx == 0) position /= interval
    position = (position - spriteDuration * idx) / interval;

    const scaleFactor = responsive && playerWidth < responsive ?
      playerWidth / responsive : 1;
    const scaledWidth = options.width * scaleFactor;
    const scaledHeight = options.height * scaleFactor;
    const cleft = Math.floor(position % columns) * -scaledWidth;
    const ctop = Math.floor(position / columns) * -scaledHeight;
    const seekBarTop = dom.findPosition(seekBarEl).top;
    // top of seekBar is 0 position
    const topOffset = -scaledHeight - Math.max(0, seekBarTop - controlsTop);

    const tooltipStyle = {
      backgroundImage: `url("${getUrl(idx)}")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `${cleft}px ${ctop}px`,
      backgroundSize: `${scaledWidth * columns}px auto`,
      top: `${topOffset}px`,
      color: '#fff',
      textShadow: '1px 1px #000',
      // box-sizing: border-box inherited from .video-js
      border: '1px solid #000',
      // border should not overlay thumbnail area
      width: `${scaledWidth + 2}px`,
      height: `${scaledHeight + 2}px`
    };

    obj.each(tooltipStyle, (value, key) => {
      tooltipEl.style[key] = value;
    });
  };

  const intCheck = opt => {
    const val = options[opt];
    const min = opt !== 'rows' ? 1 : 0;
    const check = parseInt(val, 10) === val && val >= min;

    if (!check) {
      log.warn(`${opt} must be an integer greater than ${min - 1}`);
    }
    return check;
  };

  const downlinkCheck = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const dl = 'downlink';
    const check = !connection || connection[dl] >= options[dl];

    if (!check) {
      log(`connection.${dl} < ${options[dl]}`);
    }
    return check;
  };

  const handleStateChanged = evt => {
    const pstate = plugin.state;
    const spriteEvents = ['mousemove', 'touchmove'];
    const progress = playerDescendant(_progressControl);

    if (pstate.ready) {
      debug('ready to show thumbnails');
      progress.on(spriteEvents, hijackMouseTooltip);
    } else {
      if (!options.url && !options.urlArray.length) {
        debug('no urls given, resetting');
      }
      if (progress) {
        progress.off(spriteEvents, hijackMouseTooltip);
        tooltipEl.style = tooltipStyleOrig;
      }
    }
    player.toggleClass('vjs-thumbnails-ready', pstate.ready);
  };

  const init = evt => {
    // `loadstart` callback is only needed when all of the following apply:
    // - player is set up to load an initial video via `src` or `loadMedia`
    //   specifying a `spriteThumbnails` config object
    // - the player is told e.g. by user action to load a different video `src`
    //   or `loadMedia` before metadata of the initial video is loaded and its
    //   `spriteThumbnails` options cannot be merged
    // Thereafter the `loadstart` callback is redundant.
    player.off('loadstart', init);

    // clean slate
    setDefaultState();

    // if present, merge source config with current config
    const plugName = plugin.name;
    const thumbSource = player.currentSources().find(source => {
      return source.hasOwnProperty(plugName);
    });
    let srcOpts = thumbSource && thumbSource[plugName];

    if (srcOpts) {
      // empty config unsets url and urlArray
      // force urlArray or url according to precedence
      const urlArray = srcOpts.urlArray;

      if (!Object.keys(srcOpts).length) {
        srcOpts = {url: '', urlArray: []};
      } else if (urlArray && urlArray.length) {
        srcOpts.url = '';
      } else if (srcOpts.url) {
        srcOpts.urlArray = [];
      }
      plugin.options = options = obj.merge(options, srcOpts);
    }

    const mouseTimeTooltip = playerDescendant(_timeTooltip);

    if (!mouseTimeTooltip || evt.type === 'loadstart') {
      return;
    }
    tooltipEl = mouseTimeTooltip.el();
    tooltipStyleOrig = tooltipEl.style;

    plugin.setState({
      ready: !!((options.urlArray.length || options.url) &&
        intCheck('width') && intCheck('height') && intCheck('columns') &&
        intCheck('rows') && downlinkCheck())
    });
  };

  plugin.on('statechanged', handleStateChanged);
  player.on(['loadstart', 'loadedmetadata'], init);
  player.addClass('vjs-sprite-thumbnails');
};

export default spriteThumbs;
