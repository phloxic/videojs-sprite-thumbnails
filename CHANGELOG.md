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
