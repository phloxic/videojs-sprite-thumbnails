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
  const responsive = options.responsive;

  let height = options.height || (options.resolution && options.resolution[0]);
  let width = options.width || (options.resolution && options.resolution[1]);
  let columns = options.columns || (options.grid && options.grid[0]);
  let rows = options.rows || (options.grid && options.grid[1]);

  if (!url || (!height && !rows) || (!width && !columns)) {
    return;
  }

  const dom = videojs.dom || videojs;
  const controls = player.controlBar;
  const progress = controls.progressControl;
  const seekBar = progress.seekBar;
  const mouseTimeDisplay = seekBar.mouseTimeDisplay;

  if (!mouseTimeDisplay) {
    return;
  }

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

  const chunkTiles = (columns * rows);
  const chunks = options.chunks ||
                 (options.tiles ? Math.ceil(options.tiles / chunkTiles) : 1);
  const images = new Array(chunks);
  const loader = (chunk) => {
    const img = dom.createEl('img', {
      src: typeof url === 'function' ? url(chunk + 1) : url
    });

    img.onload = (ev) => {
      if (!width && columns) {
        width = img.naturalWidth / columns;
      } else if (!columns && width) {
        columns = img.naturalWidth / width;
      }
      if (!height && rows) {
        height = img.naturalHeight / rows;
      } else if (!rows && height) {
        rows = img.naturalHeight / height;
      }
    };
    return img;
  };

  images[0] = loader(0);

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

  const hijackMouseTooltip = () => {
    if (!columns) {
      return;
    }

    const duration = player.duration();

    if (isNaN(duration)) {
      return;
    }

    let hoverPosition = parseFloat(mouseTimeDisplay.el_.style.left);

    hoverPosition = duration * (hoverPosition / seekBar.el_.clientWidth);
    if (isNaN(hoverPosition)) {
      return;
    }

    if (!options.interval && options.tiles) {
      options.interval = duration / options.tiles;
    }

    hoverPosition = Math.floor(hoverPosition / options.interval);
    const chunkNumber = Math.floor(hoverPosition / chunkTiles);
    const tileNumber = hoverPosition % chunkTiles;
    const img = images[chunkNumber];

    if (!img) {
      images[chunkNumber] = loader(chunkNumber);
      return;
    }

    const playerWidth = player.el_.clientWidth;
    const scaleFactor = responsive && playerWidth < responsive ?
                        playerWidth / responsive : 1;
    const scaledWidth = width * scaleFactor;
    const scaledHeight = height * scaleFactor;
    const columnNumber = Math.floor(tileNumber % columns);
    const rowNumber = Math.floor(tileNumber / columns);
    const cleft = columnNumber * -scaledWidth;
    const ctop = rowNumber * -scaledHeight;
    const bgSize = (img.naturalWidth * scaleFactor) + 'px ' +
                   (img.naturalHeight * scaleFactor) + 'px';
    const controlsTop = dom.getBoundingClientRect(controls.el_).top;
    const seekBarTop = dom.getBoundingClientRect(seekBar.el_).top;
    // top of seekBar is 0 position
    let topOffset = -scaledHeight;

    if (controlsTop < seekBarTop) {
      topOffset -= (seekBarTop - controlsTop);
    }

    tooltipStyle({
      'width': scaledWidth + 'px',
      'height': scaledHeight + 'px',
      'background-image': 'url(' + img.src + ')',
      'background-repeat': 'no-repeat',
      'background-position': cleft + 'px ' + ctop + 'px',
      'background-size': bgSize,
      'top': topOffset + 'px',
      'color': '#fff',
      'text-shadow': '1px 1px #000',
      'border': '1px solid #000',
      'margin': '0 1px'
    });
  };

  player.ready(() => {
    progress.on('mousemove', hijackMouseTooltip);
    progress.on('touchmove', hijackMouseTooltip);
  });
  player.addClass('vjs-sprite-thumbnails');
}
