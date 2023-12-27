import videojs from 'video.js';
import spriteThumbs from './sprite-thumbnails.js';
import {version as VERSION} from '../package.json';

const Plugin = videojs.getPlugin('plugin');

/**
 * Default plugin options
 *
 * @param {String} url
 *        Location of image(s). Must be set by user. For multiple images the
 *        filename must contain the template {index} which is replaced by the
 *        zero based index number of the image in the sequence. Default: ''.
 * @param {Array} urlArray
 *        Array of image locations. Default: [].
 * @param {Integer} width
 *        Width of a thumbnail in pixels. Must be set by user. Default: 0.
 * @param {Integer} height
 *        Height of a thumbnail in pixels. Must be set by user. Default: 0.
 * @param {Integer} columns
 *        Number of thumbnail columns per image. Must be set by user.
 * @param {Integer} rows
 *        Number of thumbnail rows per image. If set to greater than 0, the
 *        plugin will expect a sequence of images. Default: 0.
 * @param {Number} interval
 *        Interval between thumbnail frames in seconds. Default: 1.
 * @param {Function} idxTag
 *        Function determining the substitiuton of the {index} template in the
 *        current url. Default: returns index as is.
 * @param {Integer} responsive
 *        Width of player below which thumbnails are reponsive. Default: 600.
 * @param {Number} downlink
 *        Minimum of NetworkInformation downlink where supported. Default: 1.5.
 *        https://developer.mozilla.org/docs/Web/API/NetworkInformation/downlink
 */
const defaults = {
  url: '',
  idxTag(i) {
    return i;
  },
  urlArray: [],
  width: 0,
  height: 0,
  columns: 0,
  rows: 0,
  interval: 1,
  responsive: 600,
  downlink: 1.5
};

/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class SpriteThumbnails extends Plugin {

  /**
   * Create a SpriteThumbnails plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player, options);

    this.options = videojs.obj.merge(defaults, options);

    this.player.ready(() => {
      spriteThumbs(this.player, this, this.options);
    });
  }
}

// Define default values for the plugin's `state` object here.
SpriteThumbnails.defaultState = {ready: false};

// Include the version number.
SpriteThumbnails.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('spriteThumbnails', SpriteThumbnails);

export default SpriteThumbnails;
