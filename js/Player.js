(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["GameObject", "Vector2", "Emitter", "Bullet"], function(GameObject, Vector2, Emitter, Bullet) {
    var Player;
    Player = (function(_super) {
      __extends(Player, _super);

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
          isMovable: true,
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
      var v;
      this.particles = [];
      this.bullets = [];
      this.position.x = GameLoop.renderer.width / 2 - this.sprite.width / 2;
      this.position.y = 600;
      return v = new Vector2();
    };
    Player.prototype.moveLeft = function() {
      if (!this.isMovable) {
        return;
      }
      this.velocity.x = -1;
      this.position.x += this.velocity.x * this.speed;
      if (this.position.x < 0) {
        return this.position.x = 0;
      }
    };
    Player.prototype.moveRight = function() {
      if (!this.isMovable) {
        return;
      }
      this.velocity.x = 1;
      this.position.x += this.velocity.x * this.speed;
      if (this.position.x > GameLoop.renderer.width - this.sprite.width) {
        return this.position.x = GameLoop.renderer.width - this.sprite.width;
      }
    };
    Player.prototype.moveUp = function() {
      if (!this.isMovable) {
        return;
      }
      this.velocity.y = -1;
      this.position.y += this.velocity.y * this.speed;
      if (this.position.y < GameLoop.renderer.height / 2) {
        return this.position.y = GameLoop.renderer.height / 2;
      }
    };
    Player.prototype.moveDown = function() {
      if (!this.isMovable) {
        return;
      }
      this.velocity.y = 1;
      this.position.y += this.velocity.y * this.speed;
      if (this.position.y > GameLoop.renderer.height - this.sprite.height) {
        return this.position.y = GameLoop.renderer.height - this.sprite.height;
      }
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
