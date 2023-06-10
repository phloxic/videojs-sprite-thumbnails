<a name="2.1.1"></a>
## [2.1.1](https://github.com/phloxic/videojs-sprite-thumbnails/compare/v2.1.0...v2.1.1) (2023-06-10)

### Bug Fixes

* do not reset mouse time tooltip css when sprite cannot be loaded ([49b079d](https://github.com/phloxic/videojs-sprite-thumbnails/commit/49b079d))

### Documentation

* CDN link to exact latest 2.x.x release w/ higher maxage ([6bf2b73](https://github.com/phloxic/videojs-sprite-thumbnails/commit/6bf2b73))

<a name="2.1.0"></a>
# [2.1.0](https://github.com/phloxic/videojs-sprite-thumbnails/compare/v2.0.0...v2.1.0) (2023-06-06)

### Features

* **config:** lower connection downlink default to 1.5 ([875f742](https://github.com/phloxic/videojs-sprite-thumbnails/commit/875f742))
* make ready state proper boolean ([020ca39](https://github.com/phloxic/videojs-sprite-thumbnails/commit/020ca39))

### Chores

* **deps:** bump socket.io-parser from 4.2.2 to 4.2.3 ([570fd61](https://github.com/phloxic/videojs-sprite-thumbnails/commit/570fd61))

### Code Refactoring

* improve plugin defaultState handling ([239f04f](https://github.com/phloxic/videojs-sprite-thumbnails/commit/239f04f))
* slim down handling of configuration updates ([0915d10](https://github.com/phloxic/videojs-sprite-thumbnails/commit/0915d10))


### BREAKING CHANGES

* **config:** There is a subjective factor to the downlink option. As its default has been changed to 1.5 it may be worth testing and/or setting it explicitly before updating the plugin in production.

<a name="2.0.0"></a>
# [2.0.0](https://github.com/phloxic/videojs-sprite-thumbnails/compare/v1.0.0...v2.0.0) (2023-05-22)

### Features

* **loadstart:** pick options from one source only ([f01b382](https://github.com/phloxic/videojs-sprite-thumbnails/commit/f01b382))
* make plugin compatible with Video.js 8.x ([75a4e5c](https://github.com/phloxic/videojs-sprite-thumbnails/commit/75a4e5c))

### Bug Fixes

* unconditionally try loading sprite on loadstart ([ddc250e](https://github.com/phloxic/videojs-sprite-thumbnails/commit/ddc250e))

### Code Refactoring

* no parentheses needed around single argument to arrow ([2e5cd7d](https://github.com/phloxic/videojs-sprite-thumbnails/commit/2e5cd7d))

### Documentation

* **README:** explain Video.js 8.x compatible versioning ([dba689a](https://github.com/phloxic/videojs-sprite-thumbnails/commit/dba689a))
* **README:** use ES6 syntax in code examples ([e4a2073](https://github.com/phloxic/videojs-sprite-thumbnails/commit/e4a2073))

### Tests

* correct typo in sprite filename ([00a1a27](https://github.com/phloxic/videojs-sprite-thumbnails/commit/00a1a27))


### BREAKING CHANGES

- Only Video.js v8.x.x is supported
- Only browsers supported by Video.js v8.x.x are supported

<a name="1.0.0"></a>
# [1.0.0](https://github.com/phloxic/videojs-sprite-thumbnails/compare/v0.6.0...v1.0.0) (2023-05-17)

### Features

* set up in loadstart only, focus on plugin states ([4c7a616](https://github.com/phloxic/videojs-sprite-thumbnails/commit/4c7a616))
* **tooltip:** draw border around thumbnail, not inset ([6fb8b07](https://github.com/phloxic/videojs-sprite-thumbnails/commit/6fb8b07))
* truly reset tooltip style to its original state ([bbf7c05](https://github.com/phloxic/videojs-sprite-thumbnails/commit/bbf7c05))

### Bug Fixes

* double check plugin options on loadstart if state not ready ([2eb7b76](https://github.com/phloxic/videojs-sprite-thumbnails/commit/2eb7b76))
* load sprite on player ready if configured at player level ([1c3e22c](https://github.com/phloxic/videojs-sprite-thumbnails/commit/1c3e22c))
* make logging compatible with Video.js v6 and early v7 ([87e41c1](https://github.com/phloxic/videojs-sprite-thumbnails/commit/87e41c1))
* make tests work on loadstart ([11599c2](https://github.com/phloxic/videojs-sprite-thumbnails/commit/11599c2))
* quote url parameter when used with background-image css style ([976c751](https://github.com/phloxic/videojs-sprite-thumbnails/commit/976c751))

### Chores

* **deps-dev:** bump karma from 6.3.14 to 6.3.16 ([286834a](https://github.com/phloxic/videojs-sprite-thumbnails/commit/286834a))
* **deps-dev:** bump karma from 6.3.4 to 6.3.14 ([eda20a3](https://github.com/phloxic/videojs-sprite-thumbnails/commit/eda20a3))
* **deps:** bump [@xmldom](https://github.com/xmldom)/xmldom from 0.7.5 to 0.7.8 ([17dda7a](https://github.com/phloxic/videojs-sprite-thumbnails/commit/17dda7a))
* **deps:** bump engine.io and socket.io ([4ad8038](https://github.com/phloxic/videojs-sprite-thumbnails/commit/4ad8038))
* **deps:** bump engine.io and socket.io ([291c568](https://github.com/phloxic/videojs-sprite-thumbnails/commit/291c568))
* **deps:** bump follow-redirects from 1.14.4 to 1.14.8 ([b5a7988](https://github.com/phloxic/videojs-sprite-thumbnails/commit/b5a7988))
* **deps:** bump json5 from 2.2.0 to 2.2.3 ([2eecbd4](https://github.com/phloxic/videojs-sprite-thumbnails/commit/2eecbd4))
* **deps:** bump minimatch from 3.0.4 to 3.1.2 ([7650aa5](https://github.com/phloxic/videojs-sprite-thumbnails/commit/7650aa5))
* **deps:** bump minimist from 1.2.5 to 1.2.6 ([1e7c274](https://github.com/phloxic/videojs-sprite-thumbnails/commit/1e7c274))
* **deps:** bump qs and body-parser ([29e4c2d](https://github.com/phloxic/videojs-sprite-thumbnails/commit/29e4c2d))
* **deps:** bump shelljs from 0.8.4 to 0.8.5 ([6852333](https://github.com/phloxic/videojs-sprite-thumbnails/commit/6852333))
* **deps:** bump socket.io-parser from 4.0.4 to 4.0.5 ([355686b](https://github.com/phloxic/videojs-sprite-thumbnails/commit/355686b))
* **deps:** bump ua-parser-js from 0.7.31 to 0.7.33 ([f7a90dc](https://github.com/phloxic/videojs-sprite-thumbnails/commit/f7a90dc))
* **docs:** use https URLs in example ([e835ec6](https://github.com/phloxic/videojs-sprite-thumbnails/commit/e835ec6))
* **package:** bump generator-videojs-plugin to v9.0.0 ([1242dd9](https://github.com/phloxic/videojs-sprite-thumbnails/commit/1242dd9))

### Code Refactoring

* leave turning `this' into var to postprocessing ([055da3f](https://github.com/phloxic/videojs-sprite-thumbnails/commit/055da3f))
* make spriteEvents and log vars local ([544ebe3](https://github.com/phloxic/videojs-sprite-thumbnails/commit/544ebe3))
* use CSS style property names, not strings ([11f3be1](https://github.com/phloxic/videojs-sprite-thumbnails/commit/11f3be1))
* use template literals instead of string concatenation ([fa4be5c](https://github.com/phloxic/videojs-sprite-thumbnails/commit/fa4be5c))

### Tests

* state change check in own file ([4483bac](https://github.com/phloxic/videojs-sprite-thumbnails/commit/4483bac))

<a name="0.6.0"></a>
# [0.6.0](https://github.com/phloxic/videojs-sprite-thumbnails/compare/v0.5.3...v0.6.0) (2021-10-03)

### Features

* ability to load thumbnails specific to video sources ([#14](https://github.com/phloxic/videojs-sprite-thumbnails/issues/14)) ([9a5a1a6](https://github.com/phloxic/videojs-sprite-thumbnails/commit/9a5a1a6))
* introduce plugin ready state ([7b151b4](https://github.com/phloxic/videojs-sprite-thumbnails/commit/7b151b4))
* start loading sprites before playback commences ([#17](https://github.com/phloxic/videojs-sprite-thumbnails/issues/17)) ([f8f462e](https://github.com/phloxic/videojs-sprite-thumbnails/commit/f8f462e))

### Bug Fixes

* actually enable plugin when preloading ([ae40e45](https://github.com/phloxic/videojs-sprite-thumbnails/commit/ae40e45))
* clean up logging ([0d39e4b](https://github.com/phloxic/videojs-sprite-thumbnails/commit/0d39e4b))
* do not try to load image while it is preloading ([356e325](https://github.com/phloxic/videojs-sprite-thumbnails/commit/356e325))
* ensure default control bar component tree is present ([8e6e2ac](https://github.com/phloxic/videojs-sprite-thumbnails/commit/8e6e2ac))
* load cached image even when slow connection detected ([2332aaa](https://github.com/phloxic/videojs-sprite-thumbnails/commit/2332aaa))
* typo in log message ([67d4f37](https://github.com/phloxic/videojs-sprite-thumbnails/commit/67d4f37))

### Chores

* **deps:** bump http-proxy from 1.18.0 to 1.18.1 ([39ded31](https://github.com/phloxic/videojs-sprite-thumbnails/commit/39ded31))
* **deps:** bump ini from 1.3.5 to 1.3.7 ([8ba3b38](https://github.com/phloxic/videojs-sprite-thumbnails/commit/8ba3b38))
* **deps:** bump lodash from 4.17.15 to 4.17.19 ([cf3ec7f](https://github.com/phloxic/videojs-sprite-thumbnails/commit/cf3ec7f))
* **package:** generator-videojs-plugin 8.0.0 ([7a39775](https://github.com/phloxic/videojs-sprite-thumbnails/commit/7a39775))
* **package:** update author details ([009c31f](https://github.com/phloxic/videojs-sprite-thumbnails/commit/009c31f))

### Code Refactoring

* determine mouse position based on getPointerPosition ([bcdb8fc](https://github.com/phloxic/videojs-sprite-thumbnails/commit/bcdb8fc))
* list sprite event types in array ([64d43b6](https://github.com/phloxic/videojs-sprite-thumbnails/commit/64d43b6))
* make player level (only) configuration obvious ([b85f57d](https://github.com/phloxic/videojs-sprite-thumbnails/commit/b85f57d))
* relocate 2 variable declarations ([0b6b683](https://github.com/phloxic/videojs-sprite-thumbnails/commit/0b6b683))
* use findPosition to obtain seek and control bar top offsets ([d663eba](https://github.com/phloxic/videojs-sprite-thumbnails/commit/d663eba))

### Tests

* omit check absence of vjs-sprite-thumbnails class conditional ([44e6db4](https://github.com/phloxic/videojs-sprite-thumbnails/commit/44e6db4))

<a name="0.5.3"></a>
## [0.5.3](https://github.com/phloxic/videojs-sprite-thumbnails/compare/v0.5.2...v0.5.3) (2020-04-17)

### Features

* do nothing while controls are not enabled ([8630f8d](https://github.com/phloxic/videojs-sprite-thumbnails/commit/8630f8d))

### Chores

* **package:** add repo field ([e259c58](https://github.com/phloxic/videojs-sprite-thumbnails/commit/e259c58))
* **package:** generator-videojs-plugin 7.6.3 ([a33bc00](https://github.com/phloxic/videojs-sprite-thumbnails/commit/a33bc00))

<a name="0.5.2"></a>
## [0.5.2](https://github.com/phloxic/videojs-sprite-thumbnails/compare/v0.5.1...v0.5.2) (2019-01-20)

### Chores

* **package:** generator-videojs-plugin 7.6.1 ([9e798f5](https://github.com/phloxic/videojs-sprite-thumbnails/commit/9e798f5))

### Code Refactoring

* simplify image dimensions availability check ([67e31ec](https://github.com/phloxic/videojs-sprite-thumbnails/commit/67e31ec))
* store seekBar element in var ([a4e149c](https://github.com/phloxic/videojs-sprite-thumbnails/commit/a4e149c))

### Tests

* remove spurious assert ([d4e697c](https://github.com/phloxic/videojs-sprite-thumbnails/commit/d4e697c))

<a name="0.5.0"></a>
# [0.5.0](https://github.com/phloxic/videojs-sprite-thumbnails/compare/v0.4.0...v0.5.0) (2018-12-14)

### Chores

* generator-videojs-plugin v7.4.0 ([d97b737](https://github.com/phloxic/videojs-sprite-thumbnails/commit/d97b737))
* **package:** generator-videojs-plugin v7.5.0 ([80ebd7b](https://github.com/phloxic/videojs-sprite-thumbnails/commit/80ebd7b))

### Code Refactoring

* compact sprite top offset calculation ([7625c85](https://github.com/phloxic/videojs-sprite-thumbnails/commit/7625c85))
* omit return statements, do all declarations first ([c8a54c4](https://github.com/phloxic/videojs-sprite-thumbnails/commit/c8a54c4))

### Documentation

* provide unpkg.com CDN link ([468ea9c](https://github.com/phloxic/videojs-sprite-thumbnails/commit/468ea9c))

### Tests

* plugin only initalizes if all required params are given ([04ed1a0](https://github.com/phloxic/videojs-sprite-thumbnails/commit/04ed1a0))

<a name="0.4.0"></a>
# [0.4.0](https://github.com/phloxic/videojs-sprite-thumbnails/compare/v0.3.0...v0.4.0) (2018-05-01)

### Features

* **compat:** do not support videojs 5.x, but 6.0.0 upwards ([8a005fc](https://github.com/phloxic/videojs-sprite-thumbnails/commit/8a005fc))
* **package.json:** add repository field ([36e6b0b](https://github.com/phloxic/videojs-sprite-thumbnails/commit/36e6b0b))

### Bug Fixes

* do not init plugin if mouseTimeDisplay is not present ([d3c5955](https://github.com/phloxic/videojs-sprite-thumbnails/commit/d3c5955))

<a name="0.3.0"></a>
# [0.3.0](https://github.com/phloxic/videojs-sprite-thumbnails/compare/v0.2.0...v0.3.0) (2018-04-30)

### Features

* ensure that thumb sits directly on top of control bar ([3111311](https://github.com/phloxic/videojs-sprite-thumbnails/commit/3111311))

<a name="0.2.0"></a>
# 0.2.0 (2018-04-27)

* responsive thumbnail size

<a name="0.1.0"></a>
# 0.1.0 (2018-04-25)

* first beta
