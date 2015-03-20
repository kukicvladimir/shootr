(function() {
  "use strict";
  var GameObject, Metheor,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  GameObject = require('./GameObject');

  Metheor = (function(superClass) {
    extend(Metheor, superClass);

    function Metheor() {
      var dirx, dx, isCollidable, opts, position, velocity;
      opts = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      position = new PIXI.Point(0, 0);
      isCollidable = Math.random() > 0.5 ? true : false;
      dirx = [-2, -1, 0, 1, 2];
      dx = dirx[Math.round(Math.random() * dirx.length)];
      velocity = new PIXI.Point(dx, 2);
      opts = {
        position: position,
        health: 3,
        lifes: 1,
        speed: 3,
        damage: 3,
        velocity: velocity,
        isCollidable: isCollidable,
        isMovable: true,
        isDead: false,
        texture: "resources/img/metheor.png",
        collidesWith: ["Player"]
      };
      Metheor.__super__.constructor.call(this, opts);
      this.init();
      return this;
    }

    return Metheor;

  })(GameObject);

  Metheor.prototype.init = function() {
    var size;
    this.position.x = Math.random() * (GAME.renderer.width / 2);
    this.position.y = -300;
    this.position = this.position;
    if (!this.isCollidable) {
      this.tint = 0x333333;
    }
    size = Math.random() * 0.3;
    this.speed = (30 - size * 100) / 3;
    this.health = size * 20;
    this.damage = size * 20;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.scale.x = size;
    this.scale.y = size;
    this.direction = Math.random() * Math.PI * 2;
    return this.turningSpeed = Math.random() - 0.8;
  };

  Metheor.prototype.move = function() {
    this.position.x += this.velocity.x * this.speed;
    this.position.y += this.velocity.y * this.speed;
    this.direction += -this.turningSpeed * 0.1;
    this.rotation = this.direction - Math.PI / 2;
    if (this.position.y > GAME.renderer.height) {
      return GAME.currentScene.removeChild(this);
    }
  };

  Metheor.prototype.onCollision = function(obj) {
    return this.decreaseHealth(obj.damage);
  };

  module.exports = Metheor;

}).call(this);
