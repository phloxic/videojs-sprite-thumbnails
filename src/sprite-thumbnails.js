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
  const responsive = options.responsive;

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

    const playerWidth = player.el_.clientWidth;
    const scaleFactor = responsive && playerWidth < responsive ?
                        playerWidth / responsive : 1;
    const scaledWidth = width * scaleFactor;
    const scaledHeight = height * scaleFactor;
    const cleft = Math.floor(hoverPosition % columns) * -scaledWidth;
    const ctop = Math.floor(hoverPosition / columns) * -scaledHeight;
    const bgSize = (imgWidth * scaleFactor) + 'px ' +
                   (imgHeight * scaleFactor) + 'px';

    tooltipStyle({
      'width': scaledWidth + 'px',
      'height': scaledHeight + 'px',
      'background-image': 'url(' + url + ')',
      'background-repeat': 'no-repeat',
      'background-position': cleft + 'px ' + ctop + 'px',
      'background-size': bgSize,
      'top': -(scaledHeight + controls.el_.clientHeight / 2) + 'px',
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
