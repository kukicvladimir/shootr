(function() {
  "use strict";
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  define(["GameObject", "Bullet", "Vector2"], function(GameObject, Bullet, Vector2) {
    var NPC;
    NPC = (function(superClass) {
      extend(NPC, superClass);

      function NPC() {
        var opts, position, velocity;
        opts = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        position = new Vector2(0, 0);
        velocity = new Vector2(2, 2);
        opts = {
          position: position,
          velocity: velocity,
          health: 3,
          lifes: 1,
          speed: 2,
          damage: 3,
          isCollidable: true,
          isMovable: true,
          isShieldActive: false,
          shield: 0,
          isDead: false,
          sprite: "resources/img/alien.png",
          shotDelay: 150
        };
        NPC.__super__.constructor.call(this, opts);
        this.init();
        return this;
      }

      return NPC;

    })(GameObject);
    NPC.prototype.init = function() {
      this.bullets = [];
      this.position.x = Math.random() * (GameLoop.renderer.width / 2);
      this.position.y = Math.random() * ((GameLoop.renderer.height - 200) / 2);
      return this.move();
    };
    NPC.prototype.move = function() {
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
        this.velocity.x = -this.velocity.x;
      }
      if (this.position.y < 0) {
        this.velocity.y = Math.abs(this.velocity.y);
      }
      if (this.position.y > (GameLoop.renderer.height - this.sprite.height) / 2) {
        return this.velocity.y = -this.velocity.y;
      }
    };
    NPC.prototype.shoot = function() {
      var bullet, opts, position, velocity;
      this.removeBullets();
      if (Math.random() > 0.99) {
        position = new Vector2(this.position.x + this.sprite.width / 2, this.position.y);
        velocity = new Vector2(0, 1);
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
        return this.lastShotDate = Date.now();
      }
    };
    NPC.prototype.removeBullet = function(id) {
      var bullet, i, ind, len, ref, results;
      ref = this.bullets;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        bullet = ref[i];
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
    NPC.prototype.removeBullets = function() {
      var bullet, i, ind, len, ref, results;
      ref = this.bullets;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        bullet = ref[i];
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
    return NPC;
  });

}).call(this);
