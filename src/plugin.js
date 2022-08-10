import videojs from 'video.js';
import spriteThumbs from './sprite-thumbnails.js';
import {version as VERSION} from '../package.json';

const Plugin = videojs.getPlugin('plugin');

/**
 * Default plugin options
 *
 * @param {String} url
 *        Sprite location. Must be set by user.
 * @param {Integer} width
 *        Width in pixels of a thumbnail. Must be set by user.
 * @param {Integer} height
 *        Height in pixels of a thumbnail. Must be set by user.
 * @param {Number} interval
 *        Interval between thumbnail frames in seconds. Default: 1.
 * @param {Integer} responsive
 *        Width of player below which thumbnails are reponsive. Default: 600.
 * @param {Number} downlink
 *        Minimum of NetworkInformation downlink where supported. Default: 2.
 *        https://developer.mozilla.org/docs/Web/API/NetworkInformation/downlink
 */
const defaults = {
  url: '',
  width: 0,
  height: 0,
  interval: 1,
  responsive: 600,
  downlink: 2
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
    super(player);
    const that = this;

    that.options = videojs.mergeOptions(defaults, options);

    that.player.ready(() => {
      spriteThumbs(that.player, that, that.options);
    });
  }
}

// Define default values for the plugin's `state` object here.
SpriteThumbnails.defaultState = {};

// Include the version number.
SpriteThumbnails.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('spriteThumbnails', SpriteThumbnails);

export default SpriteThumbnails;
