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

  const dom = videojs.dom || videojs;
  const controls = player.controlBar;
  const progress = controls.progressControl;
  const seekBar = progress.seekBar;
  const mouseTimeDisplay = seekBar.mouseTimeDisplay;

  if (url && height && width && mouseTimeDisplay) {
    const img = dom.createEl('img', {
      src: url
    });

    const tooltipStyle = (obj) => {
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        const ttstyle = mouseTimeDisplay.timeTooltip.el().style;

        if (val !== '') {
          ttstyle.setProperty(key, val);
        } else {
          ttstyle.removeProperty(key);
        }
      });
    };

    const hijackMouseTooltip = () => {
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      if (player.controls() && imgWidth && imgHeight) {
        let hoverPosition = parseFloat(mouseTimeDisplay.el().style.left);

        hoverPosition = player.duration() * (hoverPosition / seekBar.currentWidth());
        if (!isNaN(hoverPosition)) {
          hoverPosition = hoverPosition / options.interval;

          const playerWidth = player.currentWidth();
          const scaleFactor = responsive && playerWidth < responsive ?
            playerWidth / responsive : 1;
          const columns = imgWidth / width;
          const scaledWidth = width * scaleFactor;
          const scaledHeight = height * scaleFactor;
          const cleft = Math.floor(hoverPosition % columns) * -scaledWidth;
          const ctop = Math.floor(hoverPosition / columns) * -scaledHeight;
          const bgSize = (imgWidth * scaleFactor) + 'px ' +
                         (imgHeight * scaleFactor) + 'px';
          const controlsTop = dom.getBoundingClientRect(controls.el()).top;
          const seekBarTop = dom.getBoundingClientRect(seekBar.el()).top;
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
        }
      }
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
      'margin': ''
    });

    progress.on('mousemove', hijackMouseTooltip);
    progress.on('touchmove', hijackMouseTooltip);
    player.addClass('vjs-sprite-thumbnails');
  }
}
