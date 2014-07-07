(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["GameObject", "Bullet"], function(GameObject, Bullet) {
    var Player;
    Player = (function(_super) {
      __extends(Player, _super);

      function Player() {
        var opts;
        opts = {
          x: 0,
          y: 0,
          health: 10,
          lifes: 3,
          speed: 8,
          damage: 1,
          isCollidable: true,
          isMovable: true,
          isShieldActive: false,
          shield: 0,
          sprite: "resources/img/spaceship.gif",
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
      this.sprite.position.x = HAL.renderer.width / 2 - this.sprite.width / 2;
      return this.sprite.position.y = HAL.renderer.height - 64;
    };
    Player.prototype.moveLeft = function() {
      if (!this.isMovable) {
        return;
      }
      this.sprite.position.x -= this.speed;
      if (this.sprite.position.x < 0) {
        return this.sprite.position.x = 0;
      }
    };
    Player.prototype.moveRight = function() {
      if (!this.isMovable) {
        return;
      }
      this.sprite.position.x += this.speed;
      if (this.sprite.position.x > HAL.renderer.width - this.sprite.width) {
        return this.sprite.position.x = HAL.renderer.width - this.sprite.width;
      }
    };
    Player.prototype.moveUp = function() {
      if (!this.isMovable) {
        return;
      }
      this.sprite.position.y -= this.speed;
      if (this.sprite.position.y < HAL.renderer.height / 2) {
        return this.sprite.position.y = HAL.renderer.height / 2;
      }
    };
    Player.prototype.moveDown = function() {
      if (!this.isMovable) {
        return;
      }
      this.sprite.position.y += this.speed;
      if (this.sprite.position.y > HAL.renderer.height - this.sprite.height) {
        return this.sprite.position.y = HAL.renderer.height - this.sprite.height;
      }
    };
    Player.prototype.shoot = function() {
      var bullet, opts;
      if (this.isDead()) {
        return;
      }
      this.removeBullets();
      if (this.lastShotDate < Date.now() - this.shotDelay) {
        opts = {
          damage: this.damage,
          dx: 0,
          dy: -1,
          y: this.sprite.position.y,
          x: this.sprite.position.x + this.sprite.width / 2,
          directionX: 1,
          directionY: 1,
          isCollidable: true,
          isMovable: true,
          speed: 11,
          sprite: "resources/img/bullet.png"
        };
        bullet = new Bullet(opts);
        this.bullets.push(bullet);
        GAME.stage.addChild(bullet.sprite);
        return this.lastShotDate = Date.now();
      }
    };
    Player.prototype.removeBullet = function(id) {
      var bullet, ind, _i, _len, _ref, _results;
      _ref = this.bullets;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bullet = _ref[_i];
        if ((bullet != null ? bullet.uid : void 0) === id) {
          ind = this.bullets.indexOf(bullet);
          GAME.stage.removeChild(bullet.sprite);
          _results.push(this.bullets.splice(ind, 1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    Player.prototype.removeBullets = function() {
      var bullet, ind, _i, _len, _ref, _results;
      _ref = this.bullets;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bullet = _ref[_i];
        if ((bullet != null ? bullet.sprite.position.y : void 0) < 0) {
          ind = this.bullets.indexOf(bullet);
          GAME.stage.removeChild(bullet.sprite);
          _results.push(this.bullets.splice(ind, 1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    return Player;
  });

}).call(this);
