(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  define(["GameObject", "Bullet"], function(GameObject, Bullet) {
    var RetardedNPC;
    RetardedNPC = (function(_super) {
      __extends(RetardedNPC, _super);

      function RetardedNPC() {
        var opts;
        opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        opts = {
          x: 0,
          y: 0,
          health: 1,
          lifes: 1,
          speed: 1,
          damage: 1,
          dx: 2,
          dy: 0,
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
      this.sprite.position.x = Math.random() * (HAL.renderer.width / 2);
      this.sprite.position.y = Math.random() * (HAL.renderer.height / 2);
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
      this.sprite.position.x += this.dx * this.speed;
      this.sprite.position.y += this.dy * this.speed;
      if (this.sprite.position.x < 0) {
        this.dx = Math.abs(this.dx);
      }
      if (this.sprite.position.x > HAL.renderer.width - this.sprite.width) {
        return this.dx = -this.dx;
      }
    };
    RetardedNPC.prototype.shoot = function() {
      var bullet, i, opts, _i;
      this.removeBullets();
      if (Math.random() > 0.99) {
        for (i = _i = 0; _i <= 2; i = ++_i) {
          opts = {
            damage: this.damage,
            dx: 1 - i,
            dy: 1,
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
        if ((bullet != null ? bullet.sprite.position.y : void 0) > HAL.renderer.height) {
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
