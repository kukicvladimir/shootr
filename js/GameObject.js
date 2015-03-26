(function() {
  "use strict";
  var GameObject, Geometry, PIXI, UID,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  PIXI = require("../js/vendor/pixi/bin/pixi.dev.js");

  Geometry = require("./Geometry");

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

      /*
      blink interval used when respawning
       */
      this.respawnAnimationInterval = null;
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
  increase number of lifes
   */

  GameObject.prototype.increaseLifes = function() {
    return this.lifes++;
  };


  /*
  decrease number of lifes
   */

  GameObject.prototype.decreaseLifes = function() {
    this.lifes--;
    if (this.lifes === 0) {
      if (this.constructor.name === 'Player') {
        GAME.goToScene("gameOver");
      }
      return GAME.currentScene.removeChild(this);
    } else {
      return this.respawn();
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
      this.decreaseLifes();
      if (this.lifes <= 0) {
        return this.health = 0;
      } else {
        return this.health = this.baseHealth;
      }
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
    Move object using velocity
   */

  GameObject.prototype.move = function() {
    this.position.x += this.velocity.x * this.speed;
    return this.position.y += this.velocity.y * this.speed;
  };


  /*
  Blink object to specified color
   */

  GameObject.prototype.blinkMe = function() {
    this.tint = 0xFF0000;
    return setTimeout((function(_this) {
      return function() {
        return _this.tint = 0xFFFFFF;
      };
    })(this), 50);
  };

  GameObject.prototype.respawnBlink = function() {
    this.tint = 0x00FF00;
    this.alpha = 0.2;
    return this.respawnAnimationInterval = setInterval((function(_this) {
      return function() {
        if (_this.tint === 0x00FF00) {
          return _this.tint = 0xFFFFFF;
        } else {
          return _this.tint = 0x00FF00;
        }
      };
    })(this), 20);
  };

  GameObject.prototype.respawn = function() {
    this.setCollidable(false);
    this.respawnBlink();
    return setTimeout((function(_this) {
      return function() {
        clearInterval(_this.respawnAnimationInterval);
        _this.setCollidable(true);
        _this.tint = 0xFFFFFF;
        return _this.alpha = 1;
      };
    })(this), 2000);
  };


  /*
  Resolve collisions - Iterater through all game  objects and  resolve collisions on collided objects
   */

  GameObject.prototype.resolveCollisions = function() {
    var i, len, object, ref, results;
    ref = GAME.currentScene.children;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      object = ref[i];
      if (object !== this && !!(object != null ? object.isCollidable : void 0) && $.inArray(object.constructor.name, this.collidesWith) !== -1) {
        if (Geometry.rectangleIntersectsRectangle(this, object)) {
          object.onCollision(this);
          results.push(this.onCollision(object));
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
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
