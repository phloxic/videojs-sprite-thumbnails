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
  let url = options.url;
  let height = options.height;
  let width = options.width;

  let isPreloading = false;

  const sprites = {};

  const dom = videojs.dom || videojs;
  const controls = player.controlBar;
  const progress = controls.progressControl;
  const seekBar = progress.seekBar;
  const mouseTimeDisplay = seekBar.mouseTimeDisplay;

  const tooltipStyle = (obj) => {
    const ttstyle = mouseTimeDisplay.timeTooltip.el().style;

    Object.keys(obj).forEach((key) => {
      const val = obj[key];

      if (val !== '') {
        ttstyle.setProperty(key, val);
      } else {
        ttstyle.removeProperty(key);
      }
    });
  };

  const resetMouseTooltip = () => {
    tooltipStyle({
      'width': '',
      'height': '',
      'background-image': '',
      'background-repeat': '',
      'background-position': '',
      'background-size': '',
      'top': '',
      'color': '',
      'text-shadow': '',
      'border': '',
      'margin': ''
    });
  };

  const hijackMouseTooltip = (evt) => {
    const sprite = sprites[url];
    const imgWidth = sprite.naturalWidth;
    const imgHeight = sprite.naturalHeight;
    const seekBarEl = seekBar.el();

    if (sprite.complete && imgWidth && imgHeight) {
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
      const bgSize = (imgWidth * scaleFactor) + 'px ' +
                     (imgHeight * scaleFactor) + 'px';
      const controlsTop = dom.findPosition(controls.el()).top;
      const seekBarTop = dom.findPosition(seekBarEl).top;
      // top of seekBar is 0 position
      const topOffset = -scaledHeight - Math.max(0, seekBarTop - controlsTop);

      tooltipStyle({
        'width': scaledWidth + 'px',
        'height': scaledHeight + 'px',
        'background-image': 'url(' + url + ')',
        'background-repeat': 'no-repeat',
        'background-position': cleft + 'px ' + ctop + 'px',
        'background-size': bgSize,
        'top': topOffset + 'px',
        'color': '#fff',
        'text-shadow': '1px 1px #000',
        'border': '1px solid #000',
        'margin': '0 1px'
      });
    } else {
      resetMouseTooltip();
    }
  };

  const spriteready = (preload) => {
    const spriteEvents = ['mousemove', 'touchmove'];
    const win = window;
    const navigator = win.navigator;
    const log = plugin.log;
    const downlink = options.downlink;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const dl = !connection || connection.downlink >= downlink;
    const ready = mouseTimeDisplay && (width && height || preload);
    const cached = sprites[url];

    const setReady = (bool) => {
      plugin.setState({ready: bool});
    };

    resetMouseTooltip();

    if (ready && (url && dl || cached)) {
      let msg = 'loading ' + url;

      if (!cached) {
        sprites[url] = new win.Image();
        sprites[url].src = url;
        if (preload) {
          isPreloading = true;
          msg = 'pre' + msg;
        }
      } else {
        msg = 're' + msg;
      }
      log.debug(msg);
      progress.on(spriteEvents, hijackMouseTooltip);
      setReady(true);
    } else if (!preload) {
      progress.off(spriteEvents, hijackMouseTooltip);
      setReady();
      ['url', 'width', 'height'].forEach((key) => {
        if (!options[key]) {
          log('no thumbnails ' + key + ' given');
        }
      });
      if (!dl) {
        log.warn('connection.downlink < ' + downlink);
      }
    }
  };

  // preload sprite image if url configured at plugin level
  // NOTE: must be called before loadstart, otherwise
  // neither this call nor the first loadstart has any effect
  spriteready(true);

  player.on('loadstart', () => {
    if (isPreloading) {
      isPreloading = false;
    } else {
      // load sprite configured as source property
      player.currentSources().forEach((src) => {
        const spriteOpts = src.spriteThumbnails;

        if (spriteOpts) {
          options = videojs.mergeOptions(options, spriteOpts);
          url = options.url;
          height = options.height;
          width = options.width;
        }
      });
      spriteready();
    }
  });

  player.addClass('vjs-sprite-thumbnails');
};

export default spriteThumbs;
