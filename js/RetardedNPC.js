(function() {
  "use strict";
  var Bullet, GameObject, RetardedNPC, Vector2,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  GameObject = require("./GameObject");

  Vector2 = require("./Vector2");

  Bullet = require("./Bullet");

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

  RetardedNPC.prototype.move = function() {
    this.shoot();
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
    var bullet, i, j, opts, position, results, velocity;
    if (Math.random() > 0.99) {
      results = [];
      for (i = j = 0; j <= 2; i = ++j) {
        position = new PIXI.Point(this.position.x + this.sprite.width / 2, this.position.y);
        velocity = new PIXI.Point(1 - i, 1);
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
        GAME.currentScene.addChild(bullet.sprite);
        results.push(this.lastShotDate = Date.now());
      }
      return results;
    }
  };

  module.exports = RetardedNPC;

}).call(this);
