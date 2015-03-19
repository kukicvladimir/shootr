(function() {
  "use strict";
  var Bullet, GameObject, NPC, Vector2,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  GameObject = require("./GameObject");

  Vector2 = require("./Vector2");

  Bullet = require("./Bullet");

  NPC = (function(superClass) {
    extend(NPC, superClass);

    function NPC() {
      var opts, position, velocity;
      opts = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      position = opts[0].position;
      velocity = opts[0].velocity;
      opts = {
        position: position,
        velocity: velocity,
        health: 3,
        lifes: 1,
        speed: 5,
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
      return this;
    }

    return NPC;

  })(GameObject);

  NPC.prototype.move = function() {
    this.shoot();
    this.position.x += this.velocity.x * this.speed;
    this.position.y += this.velocity.y * this.speed;
    if (this.position.x < 0) {
      this.velocity.x = Math.abs(this.velocity.x);
    }
    if (this.position.y < 0) {
      return this.velocity.y = Math.abs(this.velocity.y);
    }
  };

  NPC.prototype.shoot = function() {
    var bullet, opts, position, velocity;
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
        sprite: "resources/img/bullet.png",
        collidesWith: ['Player']
      };
      bullet = new Bullet(opts);
      GAME.objects.push(bullet);
      GAME.currentScene.addChild(bullet.sprite);
      return this.lastShotDate = Date.now();
    }
  };

  NPC.prototype.onCollision = function() {};

  module.exports = NPC;

}).call(this);
