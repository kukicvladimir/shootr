(function() {
  "use strict";
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  define(["GameObject", "Bullet", "Vector2"], function(GameObject, Bullet, Vector2) {
    var RetardedNPC;
    RetardedNPC = (function(superClass) {
      extend(RetardedNPC, superClass);

      function RetardedNPC() {
        var opts, position, velocity;
        opts = 1 <= arguments.length ? slice.call(arguments, 0) : [];
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
      var bullet, i, j, opts, position, velocity;
      this.removeBullets();
      if (Math.random() > 0.99) {
        for (i = j = 0; j <= 2; i = ++j) {
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
      var bullet, ind, j, len, ref, results;
      ref = this.bullets;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        bullet = ref[j];
        if ((bullet != null ? bullet.uid : void 0) === id) {
          ind = this.bullets.indexOf(bullet);
          GAME.stage.removeChild(bullet.sprite);
          results.push(this.bullets.splice(ind, 1));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    RetardedNPC.prototype.removeBullets = function() {
      var bullet, ind, j, len, ref, results;
      ref = this.bullets;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        bullet = ref[j];
        if ((bullet != null ? bullet.position.y : void 0) > GameLoop.renderer.height) {
          ind = this.bullets.indexOf(bullet);
          GAME.stage.removeChild(bullet.sprite);
          results.push(this.bullets.splice(ind, 1));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    return RetardedNPC;
  });

}).call(this);
