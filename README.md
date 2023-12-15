<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [videojs-sprite-thumbnails](#videojs-sprite-thumbnails)
  - [Compatibility](#compatibility)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [`<script>` Tag](#script-tag)
    - [Browserify/CommonJS](#browserifycommonjs)
    - [RequireJS/AMD](#requirejsamd)
    - [CDN](#cdn)
    - [Configuration](#configuration)
    - [Initialization](#initialization)
    - [Playlist example](#playlist-example)
    - [Debugging](#debugging)
  - [Constraints](#constraints)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# videojs-sprite-thumbnails

Plugin to display thumbnails when hovering over the progress bar.

## Compatibility

This plugin version is compatible with Video.js v8.x. Compatible [releases](https://github.com/phloxic/videojs-sprite-thumbnails/releases) and [tags](https://github.com/phloxic/videojs-sprite-thumbnails/tags) are versioned v2.x.

For Video.js v6.x, v7.x compatibility switch to the [vjs6-7-compat branch](https://github.com/phloxic/videojs-sprite-thumbnails/tree/vjs6-7-compat).

## Features

- works with single or multiple sprites containing thumbnails and individual thumbnail images
- easy to [configure](#configuration)
- uses [existing mouse time tooltip](#constraints)

## Installation

```sh
npm install --save videojs-sprite-thumbnails
```

## Usage

To include videojs-sprite-thumbnails on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-sprite-thumbnails.min.js"></script>
<script>
  const player = videojs('my-video');

  // set up 160x90 thumbnails in single sprite.jpg, 1 per second
  player.spriteThumbnails({
    url: 'https://example.com/sprite.jpg',
    width: 160,
    height: 90,
    columns: 10
  });
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-sprite-thumbnails via npm and `require` the plugin as you would any other module.

```js
const videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-sprite-thumbnails');

const player = videojs('my-other-video');

// More than 0 rows in combination with inserting {index) in the url
// signals a sprite sequence.
player.spriteThumbnails({
  interval: 3,
  url: 'https://example.com/sprite_sequence-{index}.jpg',
  columns: 5,
  rows: 5,
  width: 120,
  height: 90
});
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-sprite-thumbnails'], function(videojs) {
  const player = videojs('my-video');

  player.spriteThumbnails({
    url: 'https://example.com/sprite.jpg',
    width: 160,
    height: 90,
    columns: 10
  });
});
```

### CDN

Select a 2.x version of videojs-sprite-thumbnails from the [CDN](https://unpkg.com/videojs-sprite-thumbnails@2/dist/).

Or load the latest Video.js v8.x compatible release of the plugin via [script tag](#script-tag):

```html
<script src="https://unpkg.com/videojs-sprite-thumbnails@2.1.1/dist/videojs-sprite-thumbnails.min.js"></script>
```

### Configuration

option | type | mandatory | default | description
------ | ---- | --------- | ------- | -----------
`url`  | String | &#10004; |   | Location of image(s). Must be set by user. For multiple images the filename must contain the template `{index}` which is replaced by the zero based index number of the image in the sequence.
`width` | Integer | &#10004; |  | Width of a thumbnail in pixels.
`height` | Integer | &#10004; |   | Height of a thumbnail in pixels.
`columns` | Integer | &#10004; |   | Number of thumbnail columns per image. Set both `columns` and `rows` to `1` for individual thumbnails.
`rows` | Integer |  | `0` | Number of thumbnail rows per image. If set to greater than `0`, the plugin will expect a sequence of images. Set both `rows` and `columns` to `1` for individual thumbnails.
`interval` | Number |  | `1` | Interval between thumbnails in seconds.
`responsive` | Integer |  | `600` | Width of player in pixels below which thumbnails are responsive. Set to `0` to disable.
`downlink` | Number |  | `1.5` | Minimum of required [NetworkInformation downlink][downlink] where supported. Set to `0` to disable.

### Initialization

The plugin is initialized every time the player [starts to load](https://docs.videojs.com/player#event:loadstart) a video. It monitors all video sources for an optional `spriteThumbnails` property. Any existing plugin configuration is updated by merging this `spriteThumbnails` object into the current configuration. Typical use cases are [playlists](#playlist-example).

The image(s) are then loaded on demand, when the cursor hovers or moves over the progress bar.

### Playlist example

```js
const playlist = [
  [{
    type: 'video/webm',
    src: 'https://example.com/video1.webm',

    // only needed once, even if alternaive source is picked
    spriteThumbnails: {
      url: 'https://example.com/thumbnails1-{index}.jpg'
    }
  }, {
    type: 'video/mp4',
    src: 'https://example.com/video1.mp4'
  }], [{
    type: 'application/x-mpegurl',
    src: 'https://example.com/video2.m3u8',
    spriteThumbnails: {
      url: 'https://example.com/thumbnails2-{index}.jpg'
    }
  }]
];

const player = videojs('myplayer', {
  // player configuration
  // [...]
  // load first video in playlist
  sources: playlist[0],

  plugins: {
    // default thumbnail settings for this player
    spriteThumbnails: {
      width: 160,
      height: 90,
      columns: 5,
      rows: 5
    }
  }
});

// play 2nd video by clicking on button with id="secondvideo"
videojs.on(videojs.dom.$('button#secondvideo'), 'click', () => {
  player.src(playlist[1]);
  player.play();
});
```

### Debugging

Each plugin instance has its own [log](https://docs.videojs.com/tutorial-plugins.html#logging) which can be used for targeted debugging. Its verbosity can be set by calling the player's [plugin name property](https://docs.videojs.com/tutorial-plugins.html#the-player-plugin-name-property):

```js
player.spriteThumbnails().log.level('debug');
```

The call can also be chained directly to the [manual plugin setup](https://docs.videojs.com/tutorial-plugins.html#setting-up-a-plugin):

```js
const player = videojs('example-player');
player.spriteThumbnails({
  url: 'https://example.com/thumbnails-{index}.jpg',
  width: 240,
  height: 100,
  columns: 7,
  rows: 6
}).log.level('debug');
```

## Constraints

- To display thumbnails the plugin expects the control bar in its [default tree structure](https://docs.videojs.com/tutorial-components.html#default-component-tree) to be present.
- On some devices the [mouse time display](https://docs.videojs.com/mousetimedisplay) and its [time tooltip](https://docs.videojs.com/timetooltip) are disabled by default, and consequently thumbnails will not be shown.
- Live streams are not supported.

## License

MIT. Copyright (c) Christian Ebert &lt;bcc@phloxic.productions&gt;


[videojs]: http://videojs.com/
[downlink]: https://developer.mozilla.org/docs/Web/API/NetworkInformation/downlink
