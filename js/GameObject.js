(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  define(["EventDispatcher", "Vector2"], function(EventDispatcher, Vector2) {
    var GameObject, UID;
    UID = 0;
    GameObject = (function(_super) {
      __extends(GameObject, _super);

      function GameObject() {
        var opts;
        opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        GameObject.__super__.constructor.apply(this, arguments);
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
        this.sprite = PIXI.Sprite.fromImage(opts[0].sprite);
        this.sprite.position = this.position;
        this.lastShotDate = null;
        this.shotDelay = opts[0].shotDelay;
        return this;
      }

      return GameObject;

    })(EventDispatcher);

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
    GameObject.prototype.blinkMe = function() {
      this.sprite.tint = 0xFF0000;
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
    return GameObject;
  });

}).call(this);
