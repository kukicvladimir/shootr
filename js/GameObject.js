(function() {
  "use strict";
  var GameObject, UID, Vector2,
    slice = [].slice;

  Vector2 = require("./Vector2");

  UID = 0;

  GameObject = (function() {
    function GameObject() {
      var opts;
      opts = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      this.uid = UID++;
      this.position = opts[0].position;
      this.speed = GAME.speed + opts[0].speed;
      this.velocity = opts[0].velocity;
      this.health = opts[0].health;
      this.baseHealth = opts[0].health;
      this.lifes = opts[0].lifes;
      this.damage = opts[0].damage;
      this.isShieldActive = opts[0].isShieldActive;
      this.isMovable = opts[0].isMovable || false;
      this.isCollidable = opts[0].isCollidable || false;
      this.collidesWith = opts[0].collidesWith || [];
      this.sprite = PIXI.Sprite.fromImage(opts[0].sprite);
      this.sprite.position = this.position;
      this.lastShotDate = null;
      this.shotDelay = opts[0].shotDelay;
      return this;
    }

    return GameObject;

  })();


  /*
  set if game object is movable or not
  set movable to true/false
   */

  GameObject.prototype.setMovable = function(movable) {
    return this.isMovable = movable;
  };


  /*
  set if game object is collidable or not
  set isCollidable to true/false
   */

  GameObject.prototype.setCollidable = function(collidable) {
    return this.isCollidable = collidable;
  };


  /*
  set shieldActive to true/false
   */

  GameObject.prototype.setShieldActive = function(active) {
    return this.isShieldActive = active;
  };


  /*
  update the number of lifes of game object
   */

  GameObject.prototype.updateLifes = function(lifes) {
    this.lifes += lifes;
    if (this.lifes <= 0) {
      return this.lifes = 0;
    }
  };


  /*
  decrease health of the object if shield is not active
  reduces number of lifes left and resets health to base health
  if there are lifes left
   */

  GameObject.prototype.decreaseHealth = function(damage) {
    if (this.isShieldActive) {
      return;
    }
    this.health -= parseInt(damage);
    this.blinkMe();
    if (this.health <= 0) {
      this.updateLifes(-1);
      if (this.lifes <= 0) {
        this.health = 0;
      } else {
        this.health = this.baseHealth;
      }
    }
    if (this.lifes === 0) {
      return GAME.stage.removeChild(this.sprite);
    }
  };


  /*
  check if object is dead
   */

  GameObject.prototype.isDead = function() {
    return this.lifes <= 0;
  };


  /*
  update the health of game object
   */

  GameObject.prototype.increaseHealth = function(health) {
    this.health += health;
    if (this.health > this.baseHealth) {
      return this.health = this.baseHealth;
    }
  };


  /*
  increase speed of game object if isMovable
   */

  GameObject.prototype.updateSpeed = function(speed) {
    if (!this.isMovable) {
      return;
    }
    return this.speed += speed;
  };


  /*
  move object in specified direction
   */

  GameObject.prototype.moveTo = function(x, y) {
    if (this.isDead()) {
      return;
    }
    if (!this.isMovable) {
      return;
    }
    this.position.x += x * this.speed * GAME.speed;
    return this.position.y += y * this.speed * GAME.speed;
  };


  /*
  Move object to left
   */

  GameObject.prototype.moveLeft = function() {
    if (!this.isMovable) {
      return;
    }
    this.velocity.x = -1;
    this.position.x += this.velocity.x * this.speed * GAME.speed;
    if (this.position.x < 0) {
      return this.position.x = 0;
    }
  };


  /*
  Move object to right
   */

  GameObject.prototype.moveRight = function() {
    if (!this.isMovable) {
      return;
    }
    this.velocity.x = 1;
    this.position.x += this.velocity.x * this.speed * GAME.speed;
    if (this.position.x > GAME.renderer.width - this.sprite.width) {
      return this.position.x = GAME.renderer.width - this.sprite.width;
    }
  };


  /*
  Move object up
   */

  GameObject.prototype.moveUp = function() {
    if (!this.isMovable) {
      return;
    }
    this.velocity.y = -1;
    this.position.y += this.velocity.y * this.speed * GAME.speed;
    if (this.position.y < GAME.renderer.height / 2) {
      return this.position.y = GAME.renderer.height / 2;
    }
  };


  /*
  Move object down
   */

  GameObject.prototype.moveDown = function() {
    if (!this.isMovable) {
      return;
    }
    this.velocity.y = 1;
    this.position.y += this.velocity.y * this.speed * GAME.speed;
    if (this.position.y > GAME.renderer.height - this.sprite.height) {
      return this.position.y = GAME.renderer.height - this.sprite.height;
    }
  };


  /*
  Blink object to specified color
   */

  GameObject.prototype.blinkMe = function() {
    this.sprite.tint = 0x0000FF;
    return setTimeout((function(_this) {
      return function() {
        return _this.sprite.tint = 0xFFFFFF;
      };
    })(this), 50);
  };

  GameObject.prototype.respawnBlink = function() {
    this.sprite.tint = 0x0000FF;
    return setTimeout((function(_this) {
      return function() {
        return _this.sprite.tint = 0xFFFFFF;
      };
    })(this), 2000);
  };

  GameObject.prototype.respawn = function() {
    this.setCollidable(false);
    return setTimeout(this.respawnBlink(), this.setCollidable(true), 2000);
  };

  GameObject.prototype.resolveCollisions = function() {};

  GameObject.prototype.update = function() {
    if (this.isMovable) {
      this.move();
    }
    if (this.isCollidable) {
      return this.resolveCollisions();
    }
  };

  module.exports = GameObject;

}).call(this);
