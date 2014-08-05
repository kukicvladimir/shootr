(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  define(["GameObject", "Bullet", "Vector2"], function(GameObject, Bullet, Vector2) {
    var RetardedNPC;
    RetardedNPC = (function(_super) {
      __extends(RetardedNPC, _super);

      function RetardedNPC() {
        var opts, position, velocity;
        opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        position = new Vector2(0, 0);
        velocity = new Vector2(2, 0);
        opts = {
          position: position,
          velocity: velocity,
          health: 1,
          lifes: 1,
          speed: 1,
          damage: 1,
          isCollidable: true,
          isMovable: true,
          isShieldActive: false,
          shield: 0,
          sprite: "resources/img/retard.png",
          shotDelay: 150
        };
        RetardedNPC.__super__.constructor.call(this, opts);
        this.init();
        return this;
      }

      return RetardedNPC;

    })(GameObject);
    RetardedNPC.prototype.init = function() {
      this.bullets = [];
      this.position.x = Math.random() * (GameLoop.renderer.width / 2);
      this.position.y = Math.random() * (GameLoop.renderer.height / 2);
      return this.move();
    };
    RetardedNPC.prototype.move = function() {
      if (!this.isDead()) {
        this.shoot();
      }
      if (this.isDead()) {
        return;
      }
      if (!this.isMovable) {
        return;
      }
      this.position.x += this.velocity.x * this.speed;
      this.position.y += this.velocity.y * this.speed;
      if (this.position.x < 0) {
        this.velocity.x = Math.abs(this.velocity.x);
      }
      if (this.position.x > GameLoop.renderer.width - this.sprite.width) {
        return this.velocity.x = -this.velocity.x;
      }
    };
    RetardedNPC.prototype.shoot = function() {
      var bullet, i, opts, position, velocity, _i;
      this.removeBullets();
      if (Math.random() > 0.99) {
        for (i = _i = 0; _i <= 2; i = ++_i) {
          position = new Vector2(this.position.x + this.sprite.width / 2, this.position.y);
          velocity = new Vector2(1 - i, 1);
          opts = {
            position: position,
            velocity: velocity,
            damage: this.damage,
            isCollidable: true,
            isMovable: true,
            speed: 11,
            sprite: "resources/img/bullet.png"
          };
          bullet = new Bullet(opts);
          this.bullets.push(bullet);
          GAME.stage.addChild(bullet.sprite);
        }
        return this.lastShotDate = Date.now();
      }
    };
    RetardedNPC.prototype.removeBullet = function(id) {
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
    RetardedNPC.prototype.removeBullets = function() {
      var bullet, ind, _i, _len, _ref, _results;
      _ref = this.bullets;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bullet = _ref[_i];
        if ((bullet != null ? bullet.position.y : void 0) > GameLoop.renderer.height) {
          ind = this.bullets.indexOf(bullet);
          GAME.stage.removeChild(bullet.sprite);
          _results.push(this.bullets.splice(ind, 1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    return RetardedNPC;
  });

}).call(this);
