import videojs from 'video.js';

/**
 * Set up sprite thumbnails for a player.
 *
 * @function spriteThumbs
 * @param {Player} player
 *        The current player instance.
 * @param {Object} options
 *        Configuration options.
 */
export default function spriteThumbs(player, options) {
  const url = options.url;
  const height = options.height;
  const width = options.width;

  if (!url || !height || !width) {
    return;
  }

  const dom = videojs.dom || videojs;
  const controls = player.controlBar;
  const progress = controls.progressControl;
  const seekBar = progress.seekBar;
  const mouseTimeDisplay = seekBar.mouseTimeDisplay;

  const tooltipStyle = (obj) => {
    Object.keys(obj).forEach((key) => {
      const val = obj[key];
      const ttstyle = mouseTimeDisplay.timeTooltip.el_.style;

      if (val !== '') {
        ttstyle.setProperty(key, val);
      } else {
        ttstyle.removeProperty(key);
      }
    });
  };

  let columns = 0;
  let imgWidth = 0;
  let imgHeight = 0;

  // load sprite early
  dom.createEl('img', {
    src: url
  }).onload = (ev) => {
    const target = ev.target;

    imgWidth = target.naturalWidth;
    imgHeight = target.naturalHeight;
    columns = imgWidth / width;
  };

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
    'box-shadow': ''
  });

  const hijackMouseTooltip = () => {
    if (!columns) {
      return;
    }

    let hoverPosition = parseFloat(mouseTimeDisplay.el_.style.left);

    hoverPosition = player.duration() * (hoverPosition / seekBar.el_.clientWidth);
    if (isNaN(hoverPosition)) {
      return;
    }

    hoverPosition = hoverPosition / options.interval;

    let scaleFactor = 1;

    if (options.responsive) {
      const playerWidth = player.el_.clientWidth;

      if (playerWidth < 400) {
        scaleFactor = 0.6;
      } else if (playerWidth < 600) {
        scaleFactor = 0.7;
      }
    }

    const scaledWidth = Math.round(width * scaleFactor);
    const scaledHeight = Math.round(height * scaleFactor);
    const cleft = Math.floor(hoverPosition % columns) * -scaledWidth;
    const ctop = Math.floor(hoverPosition / columns) * -scaledHeight;
    const bgSize = Math.round(imgWidth * scaleFactor) + 'px ' +
                   Math.round(imgHeight * scaleFactor) + 'px';

    tooltipStyle({
      'width': scaledWidth + 'px',
      'height': scaledHeight + 'px',
      'background-image': 'url(' + url + ')',
      'background-repeat': 'no-repeat',
      'background-position': cleft + 'px ' + ctop + 'px',
      'background-size': bgSize,
      'top': -Math.round(scaledHeight + controls.el_.clientHeight / 2) + 'px',
      'color': '#fff',
      'text-shadow': '1px 1px #000',
      'border': '1px solid rgba(255,255,255,.8)',
      'box-shadow': '0 0 1px 1px rgba(0,0,0,.8)'
    });
  };

  player.ready(() => {
    progress.on('mousemove', hijackMouseTooltip);
    progress.on('touchmove', hijackMouseTooltip);
  });
  player.addClass('vjs-sprite-thumbnails');
}
