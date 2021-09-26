import videojs from 'video.js';
import window from 'global/window';

/**
 * Set up sprite thumbnails for a player.
 *
 * @function spriteThumbs
 * @param {Player} player
 *        The current player instance.
 * @param {Object} options
 *        Configuration options.
 */
const spriteThumbs = (player, options) => {
  let url = options.url;
  let height = options.height;
  let width = options.width;

  const sprites = {};
  const log = player.spriteThumbnails().log;

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
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const dl = !connection || connection.downlink >= options.downlink;
    const ready = mouseTimeDisplay && dl && (width && height || preload);
    const cached = sprites[url];

    resetMouseTooltip();

    if (ready && (url || cached)) {
      if (!cached) {
        sprites[url] = new win.Image();
        sprites[url].src = url;
      }
      if (preload) {
        log.debug('preloading ' + url);
      } else {
        progress.on(spriteEvents, hijackMouseTooltip);
      }
    } else if (!preload) {
      progress.off(spriteEvents, hijackMouseTooltip);
      ['url', 'width', 'height'].forEach((key) => {
        if (!options[key]) {
          log('no spriteThumbnails ' + key + ' given');
        }
      });
      if (!dl) {
        log('connection to slow, not loading thumbnails');
      }
    }
  };

  log.level(player.log.level());

  // preload sprite image if url configured at plugin level
  // NOTE: must be called before loadstart, otherwise
  // neither this call nor the first loadstart has any effect
  spriteready(true);

  player.on('loadstart', () => {
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
  });

  player.addClass('vjs-sprite-thumbnails');
};

export default spriteThumbs;
