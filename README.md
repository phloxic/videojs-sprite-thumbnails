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
      - [Three ways to configure the location of image assets](#three-ways-to-configure-the-location-of-image-assets)
      - [The idxTag function](#the-idxtag-function)
      - [Individual thumbnails](#individual-thumbnails)
    - [Initialization](#initialization)
    - [Disabling and enabling the plugin](#disabling-and-enabling-the-plugin)
    - [Playlist example](#playlist-example)
    - [CSS state classes](#css-state-classes)
    - [Debugging](#debugging)
  - [Migrating from v2.1.x](#migrating-from-v21x)
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
- 3 convenient ways to [retrieve image assets](#three-ways-to-configure-the-location-of-image-assets)
- optional [function](#the-idxtag-function) to customize access to numbered lists of sequential image assets
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
<script src="/path/to/video.min.js"></script>
<script src="/path/to/videojs-sprite-thumbnails.min.js"></script>
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
<script src="https://unpkg.com/videojs-sprite-thumbnails@2.2.1/dist/videojs-sprite-thumbnails.min.js"></script>
```

### Configuration

option | type | mandatory | default | description
------ | ---- | --------- | ------- | -----------
`url` | String | <a id="url" href="#url-as-is">single sprite</a> | `""` | Location of sprite image. Must be set by user.
`urlArray` | Array | <a id="urlarray" href="urls-in-array">multiple images</a> | `[]` | Locations of images. Must be set by user.
`url` | String | <a id="taggedurl" href="#url-by-string-expansion">multiple images</a> | `""` | Locations of multiple images via template expansion. Must be set by user.
`width` | Integer | &#10004; | `0` | Width of a thumbnail in pixels.
`height` | Integer | &#10004; | `0` | Height of a thumbnail in pixels.
`columns` | Integer | <a id="columns" href="#migrating-from-v21x">&#10004;</a> | `0` | Number of thumbnail columns per image. Set both `columns` and `rows` to `1` for [individual thumbnails](#individual-thumbnails).
`rows` | Integer | multiple images | `0` | Number of thumbnail rows per image. If set, the plugin will expect a sequence of images. The last image may have fewer rows.
`interval` | Number |  | `1` | Interval between thumbnails in seconds.
`idxTag` | <a id="idxtag" href="#the-idxtag-function">Function</a> |  |  | Function determining how the `{index}` [template](#url-by-string-expansion) in the [`url`](#taggedurl) is expanded. Returns index as is by default.
`responsive` | Integer |  | `600` | Width of player in pixels below which thumbnails are responsive. Set to `0` to disable.
`downlink` | Number |  | `1.5` | Minimum of required [NetworkInformation downlink][downlink] where supported. Set to `0` to disable.

#### Three ways to configure the location of image assets

1. <a id="url-as-is" href="#url"><code>url</code></a> as String pointing to a single sprite image:
```js
{
  url: 'https://example.com/single-sprite.jpg',
  // [... more options]
}
```

2. <a id="urls-in-array" href="#urlarray"><code>urlArray</code></a> containing multiple (sprite) images:
```js
{
  urlArray: [
    'https://example.com/first.jpg',
    'https://example.com/second.jpg',
    'https://example.com/third.jpg'
  ],
  rows: 7,         // must be greater than 0
  // [... more options]
}
```
3. <a id="url-by-string-expansion" href="#taggedurl"><code>url</code></a> as String expanded by the `idxTag` [function](#the-idxtag-function):
```js
{
  url: 'https://example.com/thumbs-{index}.jpg,
  rows: 7,         // must be greater than 0
  idxTag(index) {  // optional
    return index;  // this is the default
  },
  // [... more options]
}
```

#### The idxTag function

The function provided by this option can be used to generate various file naming schemes of sequential sprite images.

Example for thumbnail images are numbered starting from 1, 4 digits long, and padded with leading zeroes:

```js
myplayer.spriteThumbnails({
  // [ more options ... ]
  url: 'https://example.com/{index}.jpg',
  idxTag(index) {
    return `000${index + 1}`.slice(-4);
  },
  colums: 5,
  rows: 5
});
```

Of course the same can be achieved by setting [`urlArray`](#urlarray) to the full list of images:

```js
myplayer.spriteThumbnails({
  // [ more options ... ]
  urlArray: [
    'https://example.com/0001.jpg',
    'https://example.com/0002.jpg',
    'https://example.com/0003.jpg',
    'https://example.com/0004.jpg'
  ],
  colums: 5,
  rows: 5
});
```

#### Individual thumbnails

Set both `rows` and `columns` to `1`:

```js
myplayer.spriteThumbnails({
  // [ other options ]
  url: 'https://example.com/individual-thumb-{index}.avif',
  columns: 1,
  rows: 1
});
```

### Initialization

The plugin is initialized on plugin setup and every time the player [starts to load](https://docs.videojs.com/player#event:loadstart) a video. It monitors all video sources for an optional `spriteThumbnails` property. Any existing plugin configuration is updated by merging this `spriteThumbnails` object into the current configuration. Typical use cases are [playlists](#playlist-example).

The image(s) are then loaded on demand, when the cursor hovers or moves over the progress bar.

### Disabling and enabling the plugin

The plugin can temporarily be disabled or enabled by toggling its boolean `ready` state:

```js
videojs.getPlayer('myplayer').spriteThumbnails().setState({ready: false});
```

Disable the plugin for a specific video about to be loaded:

```js
videojs.getPlayer('myplayer').src([{
  type: 'video/mp4',
  src: 'https://example.com/nothumbs.mp4',
  // disable plugin with empty options object
  spriteThumbnails: {}
}]);
```

Note that the empty `spriteThumbnails: {}` configuration in this context internally uses `spriteThumbnails: {url: '', urlArray: []}` to preserve inheritance of all other options.

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

### CSS state classes

The plugin uses two CSS classes on the player element to signal the current state of plugin:

class name | plugin state
---------- | ------------
`vjs-sprite-thumbnails` | plugin is/not loaded
`vjs-thumbnails-ready` | plugin is/not ready to show thumbnails

This allows for CSS directives which apply to player elements depending on plugin state:

```css
.video-js.vjs-thumbnails-ready .vjs-progress-holder {
  background-color: green;
}
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

<h2 id="migrating-from-v21x">Migrating from v2.1.x</h2>

Plugin version 2.2.0 introduced the *mandatory* option [`columns`](#columns). Thumbnail images are now [loaded on demand](https://github.com/phloxic/videojs-sprite-thumbnails/issues/56)  which interferes less with video playback. Please apply the option to your existing setups.

## Constraints

- To display thumbnails the plugin expects the control bar in its [default tree structure](https://docs.videojs.com/tutorial-components.html#default-component-tree) to be present.
- On some devices the [mouse time display](https://docs.videojs.com/mousetimedisplay) and its [time tooltip](https://docs.videojs.com/timetooltip) are disabled by default, and consequently thumbnails will not be shown.
- Live streams are not supported.

## License

MIT. Copyright (c) Christian Ebert &lt;bcc@phloxic.productions&gt;


[videojs]: http://videojs.com/
[downlink]: https://developer.mozilla.org/docs/Web/API/NetworkInformation/downlink
