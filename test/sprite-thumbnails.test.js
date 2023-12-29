import document from 'global/document';

import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';

import plugin from '../src/plugin';

// const Player = videojs.getComponent('Player');

QUnit.test('the environment is sane', function(assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
  assert.strictEqual(typeof videojs, 'function', 'videojs exists');
  assert.strictEqual(typeof plugin, 'function', 'plugin is a function');
});

QUnit.module('videojs-sprite-thumbnails', {

  beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = sinon.useFakeTimers();

    this.fixture = document.getElementById('qunit-fixture');
    this.video = document.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);
  },

  afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

QUnit.test('changes ready state', function(assert) {
  assert.expect(7);

  this.player.spriteThumbnails({
    url: '../img/oceans-thumbs.jpg',
    width: 240,
    height: 100,
    columns: 10
  }).log.level('debug');

  assert.strictEqual(
    this.player.spriteThumbnails().state.ready,
    false,
    'the plugin is not ready to show thumbnails'
  );

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);
  this.player.trigger('loadstart');

  assert.strictEqual(
    this.player.spriteThumbnails().state.ready,
    true,
    'the plugin is now able to show thumbnails on ready'
  );
  assert.strictEqual(
    this.player.hasClass('vjs-thumbnails-ready'),
    true,
    'player has class vjs-thumbnails-ready'
  );

  this.clock.tick(1);
  const currentConfig = this.player.spriteThumbnails().options;

  this.player.src({src: 'dummy.mp4', spriteThumbnails: {}});
  this.player.trigger('loadstart');

  assert.strictEqual(
    this.player.spriteThumbnails().state.ready,
    false,
    'options empty: plugin disabled and not ready'
  );
  assert.strictEqual(
    this.player.hasClass('vjs-thumbnails-ready'),
    false,
    'player does not have class vjs-thumbnails-ready'
  );

  const overridingConfig = this.player.spriteThumbnails().options;

  assert.strictEqual(
    overridingConfig.url === '' &&
    overridingConfig.url !== currentConfig.url &&
    overridingConfig.width === currentConfig.width,
    true,
    'options empty: disabled plugin inherits options, except for url'
  );

  this.player.reset();
  this.clock.tick(1);

  this.player.src({src: 'dummy.mp4', spriteThumbnails: {url: '../img/oceans-thumbs.jpg'}});
  this.player.trigger('loadstart');

  assert.strictEqual(
    this.player.spriteThumbnails().state.ready,
    true,
    'url given on loadstart, width and height inherited: the plugin will show thumbnails'
  );
});
