(function() {
  "use strict";
  var Bullet, GameObject, NPC,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  GameObject = require("./GameObject");

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
        health: 1,
        lifes: 1,
        speed: 4,
        damage: 1,
        isCollidable: true,
        isMovable: true,
        isShieldActive: false,
        shield: 0,
        isDead: false,
        texture: "resources/img/alien.png",
        shotDelay: 150,
        collidesWith: ["Player", "Metheor"]
      };
      NPC.__super__.constructor.call(this, opts);
      return this;
    }

    return NPC;

  })(GameObject);

  NPC.prototype.move = function() {
    this.shoot();
    NPC.__super__.move.apply(this, arguments);
    if (this.position.x > GAME.renderer.width - this.width || this.position.x < 0) {
      GAME.currentScene.removeChild(this);
    }
    if (this.position.y > GAME.renderer.height) {
      return GAME.currentScene.removeChild(this);
    }
  };

  NPC.prototype.shoot = function() {
    var bullet, opts, position, velocity;
    if (Math.random() > 0.99) {
      position = new PIXI.Point(this.position.x + this.width / 2, this.position.y);
      velocity = new PIXI.Point(0, 1);
      opts = {
        position: position,
        velocity: velocity,
        damage: this.damage,
        isCollidable: true,
        isMovable: true,
        speed: 11,
        collidesWith: ['Player']
      };
      bullet = new Bullet(opts);
      GAME.currentScene.addChild(bullet);
      return this.lastShotDate = Date.now();
    }
  };

  NPC.prototype.onCollision = function(obj) {
    switch (obj.constructor.name) {
      case 'Bullet':
        this.decreaseHealth(obj.damage);
        return GAME.hud.updateScore(50);
      case 'Player':
      case 'Metheor':
        return this.decreaseLifes();
    }
  };

  module.exports = NPC;

}).call(this);
