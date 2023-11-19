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
  let url;
  let height;
  let width;
  let downlink;
  let cached;
  let dl;

  const navigator = window.navigator;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  const dom = videojs.dom;
  const obj = videojs.obj;
  const merge = obj.merge;

  const sprites = {};
  const defaultState = merge({}, plugin.state);

  const controls = player.controlBar;

  // default control bar component tree is expected
  // https://docs.videojs.com/tutorial-components.html#default-component-tree
  const progress = controls && controls.progressControl;
  const seekBar = progress && progress.seekBar;
  const mouseTimeTooltip = seekBar && seekBar.mouseTimeDisplay && seekBar.mouseTimeDisplay.timeTooltip;
  const tooltipEl = mouseTimeTooltip && mouseTimeTooltip.el();
  const tooltipStyleOrig = tooltipEl && tooltipEl.style;

  const resetMouseTooltip = () => {
    if (tooltipEl && tooltipStyleOrig) {
      tooltipEl.style = tooltipStyleOrig;
    }
  };

  const hijackMouseTooltip = evt => {
    const sprite = sprites[url];
    const imgWidth = sprite.naturalWidth;
    const imgHeight = sprite.naturalHeight;

    if (sprite.complete && imgWidth && imgHeight) {
      const seekBarEl = seekBar.el();
      let position = dom.getPointerPosition(seekBarEl, evt).x * player.duration();

      position = position / options.interval;

      const responsive = options.responsive;
      const playerWidth = player.currentWidth();
      const scaleFactor = responsive && playerWidth < responsive ?
        playerWidth / responsive : 1;
      const columns = imgWidth / width;
      const scaledWidth = width * scaleFactor;
      const scaledHeight = height * scaleFactor;
      const cleft = Math.floor(position % columns) * -scaledWidth;
      const ctop = Math.floor(position / columns) * -scaledHeight;
      const bgSize = `${imgWidth * scaleFactor}px ${imgHeight * scaleFactor}px`;
      const controlsTop = dom.findPosition(controls.el()).top;
      const seekBarTop = dom.findPosition(seekBarEl).top;
      // top of seekBar is 0 position
      const topOffset = -scaledHeight - Math.max(0, seekBarTop - controlsTop);
      const tooltipStyle = {
        backgroundImage: `url("${url}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `${cleft}px ${ctop}px`,
        backgroundSize: bgSize,
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
    }
  };

  const init = () => {
    // if present, merge source config with current config
    const plugName = plugin.name;
    const spriteSource = player.currentSources().find(source => {
      return source.hasOwnProperty(plugName);
    });
    const spriteOpts = spriteSource && spriteSource[plugName];

    if (spriteOpts) {
      plugin.setState(defaultState);
      options = merge(options, spriteOpts);

      // url from source always takes precedence, even if empty
      options.url = spriteOpts.url;
    }

    // update script variables
    url = options.url;
    height = options.height;
    width = options.width;
    downlink = options.downlink;
    dl = !connection || connection.downlink >= downlink;
    cached = !!sprites[url];

    plugin.setState({
      ready: !!(mouseTimeTooltip && width && height && url && (cached || dl)),
      diagnostics: true
    });
  };

  plugin.on('statechanged', () => {
    const pstate = plugin.state;
    const spriteEvents = ['mousemove', 'touchmove'];
    const log = plugin.log;
    const debug = log.debug;

    if (pstate.ready) {
      let msg = `loading ${url}`;

      debug('ready to show thumbnails');
      if (!cached) {
        sprites[url] = dom.createEl('img', {
          src: url
        });
      } else {
        msg = `re${msg}`;
      }
      debug(msg);
      progress.on(spriteEvents, hijackMouseTooltip);
    } else {
      progress.off(spriteEvents, hijackMouseTooltip);
      resetMouseTooltip();
      if (pstate.diagnostics) {
        debug('resetting');
        ['url', 'width', 'height'].forEach(key => {
          if (!options[key]) {
            log(`no thumbnails ${key} given`);
          }
        });
        if (connection && !dl) {
          log.warn(`connection.downlink < ${downlink}`);
        }
      }
    }
  });

  // load configuration from a source
  player.on('loadstart', init);

  // load plugin configuration
  init();
  player.addClass('vjs-sprite-thumbnails');
};

export default spriteThumbs;
