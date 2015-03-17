(function() {
  "use strict";
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  define(["GameObject", "Vector2"], function(GameObject, Vector2) {
    var Metheor;
    Metheor = (function(superClass) {
      extend(Metheor, superClass);

      function Metheor() {
        var dirx, dx, isCollidable, opts, position, velocity;
        opts = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        position = new Vector2(0, 0);
        isCollidable = Math.random() > 0.5 ? true : false;
        dirx = [-2, -1, 0, 1, 2];
        dx = dirx[Math.round(Math.random() * dirx.length)];
        velocity = new Vector2(dx, 2);
        opts = {
          position: position,
          health: 3,
          lifes: 1,
          speed: 3,
          damage: 3,
          velocity: velocity,
          isCollidable: isCollidable,
          isMovable: true,
          isShieldActive: false,
          shield: 0,
          isDead: false,
          sprite: "resources/img/metheor.png",
          shotDelay: 150
        };
        Metheor.__super__.constructor.call(this, opts);
        this.init();
        return this;
      }

      return Metheor;

    })(GameObject);
    Metheor.prototype.init = function() {
      var size;
      this.position.x = Math.random() * (GameLoop.renderer.width / 2);
      this.position.y = -300;
      this.sprite.position = this.position;
      if (!this.isCollidable) {
        this.sprite.tint = 0x333333;
      }
      size = Math.random() * 0.3;
      this.speed = (30 - size * 100) / 3;
      this.health = size * 20;
      this.damage = size * 20;
      this.sprite.anchor.x = 0.5;
      this.sprite.anchor.y = 0.5;
      this.sprite.scale.x = size;
      this.sprite.scale.y = size;
      this.direction = Math.random() * Math.PI * 2;
      this.turningSpeed = Math.random() - 0.8;
      return this.move();
    };
    Metheor.prototype.move = function() {
      this.position.x += this.velocity.x * this.speed;
      this.position.y += this.velocity.y * this.speed;
      this.direction += -this.turningSpeed * 0.1;
      return this.sprite.rotation = this.direction - Math.PI / 2;
    };
    return Metheor;
  });

}).call(this);
