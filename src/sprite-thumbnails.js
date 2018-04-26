import videojs from 'video.js';

/**
 * doc placeholder
 *
 * @function spriteThumbs
 * @param {Player} player
 *        The current player instance.
 * @param {Object} [options={}]
 *        4 mandatory configuration options.
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
  const mouseDisplay = dom.$('.vjs-mouse-display', progress.el());
  const tooltip = dom.$('.vjs-time-tooltip', mouseDisplay);
  const progressSlider = dom.$('.vjs-progress-holder', progress.el());

  const tooltipStyle = (obj) => {
    Object.keys(obj).forEach((key) => {
      const val = obj[key];
      const ttstyle = tooltip.style;

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

    const sliderWidth = parseFloat(videojs.computedStyle(progressSlider, 'width'));
    let hoverPosition = parseFloat(mouseDisplay.style.left);

    hoverPosition = player.duration() * (hoverPosition / sliderWidth);
    if (isNaN(hoverPosition)) {
      return;
    }

    hoverPosition = hoverPosition / options.interval;

    let scaleFactor = 1;

    if (options.responsive) {
      const playerWidth = player.el().clientWidth;

      if (playerWidth < 400) {
        scaleFactor = 0.6;
      } else if (playerWidth < 600) {
        scaleFactor = 0.7;
      }
    }

    const cleft = Math.floor(hoverPosition % columns) * -(width * scaleFactor);
    const ctop = Math.floor(hoverPosition / columns) * -(height * scaleFactor);
    const bgSize = (imgWidth * scaleFactor) + 'px ' + (imgHeight * scaleFactor) + 'px';
    let verticalOffset = videojs.computedStyle(controls.el(), 'height');

    verticalOffset = parseInt(verticalOffset, 10) / 2;

    tooltipStyle({
      'width': (width * scaleFactor) + 'px',
      'height': (height * scaleFactor) + 'px',
      'background-image': 'url(' + url + ')',
      'background-repeat': 'no-repeat',
      'background-position': cleft + 'px ' + ctop + 'px',
      'background-size': bgSize,
      'top': -(height * scaleFactor + verticalOffset) + 'px',
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
}
