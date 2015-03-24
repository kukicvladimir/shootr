(function() {
  "use strict";
  var Bullet, GameObject, YellowQueen,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  GameObject = require("./GameObject");

  Bullet = require("./Bullet");

  YellowQueen = (function(superClass) {
    extend(YellowQueen, superClass);

    function YellowQueen() {
      var opts, position, velocity;
      opts = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      position = opts[0].position;
      velocity = opts[0].velocity;
      opts = {
        position: position,
        velocity: velocity,
        health: 500,
        lifes: 1,
        speed: 4,
        damage: 3,
        isCollidable: true,
        isMovable: true,
        isShieldActive: false,
        shield: 0,
        isDead: false,
        texture: "resources/img/queen.png",
        shotDelay: 150
      };
      YellowQueen.__super__.constructor.call(this, opts);
      return this;
    }

    return YellowQueen;

  })(GameObject);

  YellowQueen.prototype.move = function() {
    this.shoot();
    this.position.x += this.velocity.x * this.speed;
    this.position.y += this.velocity.y * this.speed;
    if (this.position.x < 0) {
      this.velocity.x = Math.abs(this.velocity.x);
    }
    if (this.position.x > GAME.renderer.width - this.width) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.y < 0) {
      this.velocity.y = Math.abs(this.velocity.y);
    }
    if (this.position.y > GAME.renderer.height / 2) {
      this.velocity.y = -this.velocity.y;
    }
    if (this.position.x > GAME.renderer.width + 300) {
      return GAME.currentScene.removeChild(this);
    }
  };

  YellowQueen.prototype.shoot = function() {
    var bullet, directionX, opts, position, rand, velocity;
    if (Math.random() > 0.80) {
      position = new PIXI.Point(this.position.x + this.width / 2, this.position.y);
      rand = Math.random();
      directionX = -2;
      if (rand > 0.2) {
        directionX = -1;
      }
      if (rand > 0.4) {
        directionX = 0;
      }
      if (rand > 0.6) {
        directionX = 1;
      }
      if (rand > 0.8) {
        directionX = 2;
      }
      velocity = new PIXI.Point(directionX, 1);
      opts = {
        position: position,
        velocity: velocity,
        damage: this.damage,
        isCollidable: true,
        isMovable: true,
        speed: 4,
        collidesWith: ['Player']
      };
      bullet = new Bullet(opts);
      GAME.currentScene.addChild(bullet);
      return this.lastShotDate = Date.now();
    }
  };

  YellowQueen.prototype.onCollision = function(obj) {
    this.decreaseHealth(obj.damage);
    return GAME.hud.updateScore(20);
  };

  module.exports = YellowQueen;

}).call(this);
