(function() {
  "use strict";
  var GameObject, PIXI, UID,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  PIXI = require("../js/vendor/pixi/bin/pixi.dev.js");

  UID = 0;

  GameObject = (function(superClass) {
    extend(GameObject, superClass);

    function GameObject() {
      var base, img, opts, texture;
      opts = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      img = new Image();
      img.src = opts[0].texture;
      base = new PIXI.BaseTexture(img);
      texture = new PIXI.Texture(base);
      GameObject.__super__.constructor.call(this, texture);

      /*
      Unique object identifier
       */
      this._uid = UID++;

      /*
      Object position
       */
      this.position = opts[0].position;

      /*
      Object speed
       */
      this.speed = GAME.speed + opts[0].speed;

      /*
      Object velocity
       */
      this.velocity = opts[0].velocity;

      /*
      Object health
       */
      this.health = opts[0].health;

      /*
      Object base health - used for HUD calculation only
       */
      this.baseHealth = opts[0].health;

      /*
      Object lifes - integer value
      Number of object lifes
       */
      this.lifes = opts[0].lifes;

      /*
      Object damage - integer value
       */
      this.damage = opts[0].damage;

      /*
      Object isMovable - boolean value
      determines if object is movable
       */
      this.isMovable = opts[0].isMovable || false;

      /*
      Object isCollidable - boolean value
      determines if object is collidable
       */
      this.isCollidable = opts[0].isCollidable || false;

      /*
      Object collidesWith - list
      list of collidable objects
       */
      this.collidesWith = opts[0].collidesWith || [];

      /*
      Object lastShotDate - date
      used to determine if Object can shoot (depends on shotDelay
       */
      this.lastShotDate = null;

      /*
      Object shotDelay- integer value
      shot delay in milliseconds
       */
      this.shotDelay = opts[0].shotDelay;
      return this;
    }

    return GameObject;

  })(PIXI.Sprite);


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
    if (this.position.x > GAME.renderer.width - this.width) {
      return this.position.x = GAME.renderer.width - this.width;
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
    if (this.position.y > GAME.renderer.height - this.height) {
      return this.position.y = GAME.renderer.height - this.height;
    }
  };


  /*
  Blink object to specified color
   */

  GameObject.prototype.blinkMe = function() {
    this.tint = 0x0000FF;
    return setTimeout((function(_this) {
      return function() {
        return _this.tint = 0xFFFFFF;
      };
    })(this), 50);
  };

  GameObject.prototype.respawnBlink = function() {
    this.tint = 0x0000FF;
    return setTimeout((function(_this) {
      return function() {
        return _this.tint = 0xFFFFFF;
      };
    })(this), 2000);
  };

  GameObject.prototype.respawn = function() {
    this.setCollidable(false);
    return setTimeout(this.respawnBlink(), this.setCollidable(true), 2000);
  };

  GameObject.prototype.resolveCollisions = function() {
    return this.onCollision();
  };

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
