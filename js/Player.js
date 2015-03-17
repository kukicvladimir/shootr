(function() {
  "use strict";
  var Bullet, GameObject, Player, Vector2,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  GameObject = require("./GameObject");

  Vector2 = require("./Vector2");

  Bullet = require("./Bullet");

  Player = (function(superClass) {
    extend(Player, superClass);

    function Player() {
      var opts, position, velocity;
      position = new Vector2(0, 0);
      velocity = new Vector2(0, 0);
      opts = {
        position: position,
        velocity: velocity,
        health: 10,
        lifes: 3,
        speed: 8,
        damage: 1,
        shield: 0,
        isCollidable: true,
        isMovable: false,
        isShieldActive: false,
        sprite: "resources/img/spaceship.png",
        shotDelay: 150
      };
      Player.__super__.constructor.call(this, opts);
      this.init();
      return this;
    }

    return Player;

  })(GameObject);

  Player.prototype.init = function() {
    this.bullets = [];
    this.position.x = GAME.renderer.width / 2 - this.sprite.width / 2;
    this.position.y = GAME.renderer.height - 100;
    return setTimeout((function(_this) {
      return function() {
        return _this.isMovable = true;
      };
    })(this), 3000);
  };

  Player.prototype.shoot = function() {
    var bullet, opts, position, velocity;
    if (this.isDead()) {
      return;
    }
    this.removeBullets();
    if (this.lastShotDate < Date.now() - this.shotDelay) {
      velocity = new Vector2(0, -1);
      position = new Vector2(this.position.x + this.sprite.width / 2, this.position.y);
      opts = {
        damage: this.damage,
        position: position,
        velocity: velocity,
        isCollidable: true,
        isMovable: true,
        speed: 11,
        sprite: "resources/img/bullet.png"
      };
      bullet = new Bullet(opts);
      this.bullets.push(bullet);
      GAME.currentScene.addChild(bullet.sprite);
      return this.lastShotDate = Date.now();
    }
  };

  Player.prototype.removeBullet = function(id) {
    var bullet, i, ind, len, ref, results;
    ref = this.bullets;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      bullet = ref[i];
      if ((bullet != null ? bullet.uid : void 0) === id) {
        ind = this.bullets.indexOf(bullet);
        GAME.currentScene.removeChild(bullet.sprite);
        results.push(this.bullets.splice(ind, 1));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Player.prototype.removeBullets = function() {
    var bullet, i, ind, len, ref, results;
    ref = this.bullets;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      bullet = ref[i];
      if ((bullet != null ? bullet.sprite.position.y : void 0) < 0) {
        ind = this.bullets.indexOf(bullet);
        GAME.currentScene.removeChild(bullet.sprite);
        results.push(this.bullets.splice(ind, 1));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  module.exports = Player;

}).call(this);
