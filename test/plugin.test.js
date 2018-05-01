import document from 'global/document';

import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';

import plugin from '../src/plugin';

const Player = videojs.getComponent('Player');

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

QUnit.test('registers itself with video.js', function(assert) {
  assert.expect(2);

  assert.strictEqual(
    typeof Player.prototype.spriteThumbnails,
    'function',
    'videojs-sprite-thumbnails plugin was registered'
  );

  this.player.spriteThumbnails({
    url: 'https://raw.githubusercontent.com/blacktrash/videojs-sprite-thumbnails/master/img/oceans-thumbs.jpg',
    width: 240,
    height: 100
  });

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  if (this.player.controlBar.progressControl.seekBar.mouseTimeDisplay !== undefined) {
    assert.ok(
      this.player.hasClass('vjs-sprite-thumbnails'),
      'the plugin adds a class to the player'
    );
  } else {
    assert.ok(
      !this.player.hasClass('vjs-sprite-thumbnails'),
      'no mouseTimeDisplay: no-op plugin does not advertise itself'
    );
  }
});
