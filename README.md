# videojs-sprite-thumbnails

Plugin to display thumbnails from a sprite image when hovering over the progress bar.

## Features

- easy to [configure](#configuration)
- uses existing hover position display element
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

## License

MIT. Copyright (c) Christian Ebert &lt;blacktrash@gmx.net&gt;


[videojs]: http://videojs.com/
