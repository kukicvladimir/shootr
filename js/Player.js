(function() {
  "use strict";
  var Bullet, GameObject, Player,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  GameObject = require("./GameObject");

  Bullet = require("./Bullet");

  Player = (function(superClass) {
    extend(Player, superClass);

    function Player() {
      var opts, position, velocity;
      position = new PIXI.Point(0, 0);
      velocity = new PIXI.Point(0, 0);
      opts = {
        position: position,
        velocity: velocity,
        health: 10,
        lifes: 3,
        speed: 8,
        damage: 1,
        isCollidable: true,
        isMovable: true,
        isShieldActive: false,
        texture: "resources/img/spaceship.gif",
        shotDelay: 150,
        collidesWith: ['NPC', 'Metheor', 'YellowQueen']
      };
      Player.__super__.constructor.call(this, opts);
      this.init();
      return this;
    }

    return Player;

  })(GameObject);

  Player.prototype.init = function() {
    this.position.x = GAME.renderer.width / 2 - this.width / 2;
    return this.position.y = GAME.renderer.height - 100;
  };

  Player.prototype.shoot = function() {
    var bullet, opts, position, velocity;
    if (this.lastShotDate < Date.now() - this.shotDelay) {
      velocity = new PIXI.Point(0, -1);
      position = new PIXI.Point(this.position.x + this.width / 2, this.position.y);
      opts = {
        damage: this.damage,
        position: position,
        velocity: velocity,
        isCollidable: true,
        isMovable: true,
        speed: 10,
        collidesWith: ['NPC', 'Metheor', 'YellowQueen', 'Satellite']
      };
      bullet = new Bullet(opts);
      GAME.currentScene.addChild(bullet);
      return this.lastShotDate = Date.now();
    }
  };

  Player.prototype.move = function() {
    if (GAME.currentScene.constructor.name === 'Level1') {
      if (GAME.inputManager.keyDown(GAME.inputManager.Keys.LEFT)) {
        this.moveLeft();
      }
      if (GAME.inputManager.keyDown(GAME.inputManager.Keys.RIGHT)) {
        this.moveRight();
      }
      if (GAME.inputManager.keyDown(GAME.inputManager.Keys.UP)) {
        this.moveUp();
      }
      if (GAME.inputManager.keyDown(GAME.inputManager.Keys.DOWN)) {
        this.moveDown();
      }
      if (GAME.inputManager.keyDown(GAME.inputManager.Keys.SPACE)) {
        return this.shoot();
      }
    }
  };

  Player.prototype.onCollision = function(obj) {
    switch (obj.getObjectType()) {
      case 'Bullet':
        this.decreaseHealth(obj.damage);
        break;
      case 'NPC':
      case 'Metheor':
        this.decreaseLifes();
    }
    return GAME.hud.updateHealthBarAndLifes(this.health, this.baseHealth, this.lifes);
  };

  module.exports = Player;

}).call(this);
