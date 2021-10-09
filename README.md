<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [videojs-sprite-thumbnails](#videojs-sprite-thumbnails)
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

Plugin to display thumbnails from a sprite image when hovering over the progress bar.

## Features

- easy to [configure](#configuration)
- uses [existing mouse time tooltip](#constraints)
- focuses on use case of thumbnails combined in a sprite image only

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
  var player = videojs('my-video');

  // setup 160x90 thumbnails in sprite.jpg, 1 per second
  player.spriteThumbnails({
    url: 'https://example.com/sprite.jpg',
    width: 160,
    height: 90
  });
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-sprite-thumbnails via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-sprite-thumbnails');

var player = videojs('my-other-video');

player.spriteThumbnails({
  interval: 3,
  url: 'https://example.com/another-sprite.jpg',
  width: 120,
  height: 90
});
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-sprite-thumbnails'], function(videojs) {
  var player = videojs('my-video');

  player.spriteThumbnails({
    url: 'https://example.com/sprite.jpg',
    width: 160,
    height: 90
  });
});
```

### CDN

Select a version of videojs-sprite-thumbnails from the [CDN](https://unpkg.com/videojs-sprite-thumbnails/dist/).

### Configuration

option | type | mandatory | default | description
------ | ---- | --------- | ------- | -----------
`url`  | String | &#10004; |   | Sprite image location.
`width` | Integer | &#10004; |  | Width of a thumbnail in pixels.
`height` | Integer | &#10004; |   | Height of a thumbnail in pixels.
`interval` | Number |  | `1` | Interval between thumbnail frames in seconds.
`responsive` | Integer |  | `600` | Width of player in pixels below which thumbnails are reponsive. Set to `0` to disable.
`downlink` | Number |  | `2` | Minimum of required [NetworkInformation downlink][downlink] where supported. Set to `0` to disable.

### Initialization

The plugin is initialized at player setup. This is sufficient when the player will play only one video and use its thumbnails. The single sprite image will be preloaded at player setup, usually on page load.

The plugin also monitors all video sources on
[loadstart](https://docs.videojs.com/player#event:loadstart) for a `spriteThumbnails` property which configures the plugin for this specific video. A typical use case are [playlists](#playlist-example). Each sprite image is loaded before playback of the video to which it pertains.

### Playlist example

```js
var playlist = [
  [{
    type: 'video/webm',
    src: 'https://example.com/video1.webm',

    // only needed once, even if alternaive source is picked
    spriteThumbnails: {
      url: 'https://example.com/thumbnails1.jpg'
    }
  }, {
    type: 'video/mp4',
    src: 'https://example.com/video1.mp4'
  }], [{
    type: 'application/x-mpegurl',
    src: 'https://example.com/video2.m3u8',
    spriteThumbnails: {
      url: 'https://example.com/thumbnails2.jpg'
    }
  }]
];

var player = videojs('myplayer', {
  // player configuration
  // [...]
  // load first video in playlist
  sources: playlist[0],

  plugins: {
    // default thumbnail settings for this player
    spriteThumbnails: {
      width: 160,
      height: 90
    }
  }
});

// play 2nd video by clicking on button with id="secondvideo"
videojs.on(videojs.dom.$('button#secondvideo'), 'click', function () {
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
var player = videojs('example-player');
player.spriteThumbnails({
  url: 'https://example.com/thumbnails.jpg',
  width: 240,
  height: 100
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
