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
  assert.expect(2);

  this.player.spriteThumbnails({
    url: 'https://raw.githubusercontent.com/phloxic/videojs-sprite-thumbnails/master/img/oceans-thumbs.jpg',
    width: 240,
    height: 100
  }).log.level('debug');

  assert.strictEqual(
    this.player.spriteThumbnails().state.ready,
    false,
    'the plugin is not ready to show thumbnails'
  );

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  assert.strictEqual(
    this.player.spriteThumbnails().state.ready,
    true,
    'the plugin is now able to show thumbnails'
  );
});