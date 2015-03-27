(function() {
  "use strict";
  var Bullet, GameObject, Satellite,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  GameObject = require("./GameObject");

  Bullet = require("./Bullet");

  Satellite = (function(superClass) {
    extend(Satellite, superClass);

    function Satellite() {
      var opts, position, velocity;
      opts = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      position = opts[0].position;
      velocity = opts[0].velocity;
      opts = {
        position: position,
        velocity: velocity,
        health: 1,
        lifes: 1,
        speed: 1,
        damage: 4,
        isCollidable: true,
        isMovable: true,
        isShieldActive: false,
        shield: 0,
        texture: "resources/img/retard.png",
        shotDelay: 2500,
        collidesWith: ["Player", "Metheor"]
      };
      Satellite.__super__.constructor.call(this, opts);
      return this;
    }

    return Satellite;

  })(GameObject);

  Satellite.prototype.move = function() {
    this.shoot();
    Satellite.__super__.move.apply(this, arguments);
    if (this.position.x > GAME.renderer.width - this.width || this.position.x < 0) {
      return GAME.currentScene.removeChild(this);
    }
  };

  Satellite.prototype.shoot = function() {
    var bullet, i, j, opts, position, velocity;
    if (this.lastShotDate < Date.now() - this.shotDelay) {
      for (i = j = 0; j <= 2; i = ++j) {
        position = new PIXI.Point(this.position.x + this.width / 2, this.position.y);
        velocity = new PIXI.Point(1 - i, 1);
        opts = {
          position: position,
          velocity: velocity,
          damage: this.damage,
          isCollidable: true,
          isMovable: true,
          speed: 3
        };
        bullet = new Bullet(opts);
        GAME.currentScene.addChild(bullet);
      }
      return this.lastShotDate = Date.now();
    }
  };

  Satellite.prototype.onCollision = function(obj) {
    switch (obj.getObjectType()) {
      case 'Bullet':
        this.decreaseHealth(obj.damage);
        return GAME.hud.updateScore(100);
      case 'Player':
      case 'Metheor':
        return this.decreaseLifes();
    }
  };

  module.exports = Satellite;

}).call(this);
