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
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  const dom = videojs.dom || videojs;
  const log = plugin.log || videojs.log;
  const merge = videojs.mergeOptions;

  const defaultState = merge({}, plugin.state);

  const controls = player.controlBar;

  // default control bar component tree is expected
  // https://docs.videojs.com/tutorial-components.html#default-component-tree
  const progress = controls && controls.progressControl;
  const seekBar = progress && progress.seekBar;
  const mouseTimeTooltip = seekBar && seekBar.mouseTimeDisplay && seekBar.mouseTimeDisplay.timeTooltip;
  const tooltipEl = mouseTimeTooltip && mouseTimeTooltip.el();
  const tooltipStyleOrig = tooltipEl && tooltipEl.style;

  const hijackMouseTooltip = evt => {
    const seekBarEl = seekBar.el();
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
    const controlsTop = dom.findPosition(controls.el()).top;
    const seekBarTop = dom.findPosition(seekBarEl).top;
    // top of seekBar is 0 position
    const topOffset = -scaledHeight - Math.max(0, seekBarTop - controlsTop);

    const tooltipStyle = {
      backgroundImage: `url("${options.url.replace('{index}', idx)}")`,
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

    Object.keys(tooltipStyle).forEach(key => {
      tooltipEl.style[key] = tooltipStyle[key];
    });
  };

  const intCheck = opt => {
    const val = options[opt];
    const min = opt !== 'rows' ? 1 : 0;

    if (parseInt(val, 10) !== val || val < min) {
      log(`${opt} must be an integer greater than ${min - 1}`);
      return false;
    }
    return true;
  };

  const init = () => {
    // if present, merge source config with current config
    const plugName = plugin.name;
    const spriteSource = player.currentSources().filter(source => {
      return source.hasOwnProperty(plugName);
    })[0];
    const spriteOpts = spriteSource && spriteSource[plugName];

    if (spriteOpts) {
      plugin.setState(defaultState);
      options = merge(options, spriteOpts);

      // url from source always takes precedence, even if undefined
      options.url = spriteOpts.url || '';

      // upgrade plugin options property
      plugin.options = options;
    }

    const dl = !connection || connection.downlink >= options.downlink;

    plugin.setState({
      ready: !!(mouseTimeTooltip && options.url &&
        intCheck('width') && intCheck('height') && intCheck('columns') &&
        intCheck('rows') && dl),
      diagnostics: true
    });
  };

  plugin.on('statechanged', () => {
    const pstate = plugin.state;
    const spriteEvents = ['mousemove', 'touchmove'];
    const debug = log.debug || log;

    if (pstate.ready) {
      debug('ready to show thumbnails');
      progress.on(spriteEvents, hijackMouseTooltip);
    } else {
      if (pstate.diagnostics) {
        if (!options.url) {
          log('no url given');
        }
        if (connection && connection.downlink < options.downlink) {
          log.warn(`connection.downlink < ${options.downlink}`);
        }
        debug('resetting');
      }
      progress.off(spriteEvents, hijackMouseTooltip);
      tooltipEl.style = tooltipStyleOrig;
    }
  });

  // load configuration from a source
  player.on('loadstart', init);

  // load plugin configuration
  init();
  player.addClass('vjs-sprite-thumbnails');
};

export default spriteThumbs;
