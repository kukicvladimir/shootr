(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  define(["GameObject"], function(GameObject) {
    var Metheor;
    Metheor = (function(_super) {
      __extends(Metheor, _super);

      function Metheor() {
        var dirx, dx, isCollidable, opts;
        opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        isCollidable = Math.random() > 0.5 ? true : false;
        dirx = [-2, -1, 0, 1, 2];
        dx = dirx[Math.round(Math.random() * dirx.length)];
        opts = {
          x: 0,
          y: 0,
          health: 3,
          lifes: 1,
          speed: 3,
          damage: 3,
          dx: dx,
          dy: 2,
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
      this.sprite.position.x = Math.random() * (HAL.renderer.width / 2);
      this.sprite.position.y = -300;
      if (!this.isCollidable) {
        this.sprite.tint = 0x222222;
      }
      size = Math.random() * 0.3;
      this.speed = (30 - size * 100) / 3;
      this.health = size * 20;
      this.sprite.anchor.x = 0.5;
      this.sprite.anchor.y = 0.5;
      this.sprite.scale.x = size;
      this.sprite.scale.y = size;
      this.direction = Math.random() * Math.PI * 2;
      this.turningSpeed = Math.random() - 0.8;
      return this.move();
    };
    Metheor.prototype.move = function() {
      this.sprite.position.x += this.dx * this.speed;
      this.sprite.position.y += this.dy * this.speed;
      this.direction += -this.turningSpeed * 0.1;
      return this.sprite.rotation = this.direction - Math.PI / 2;
    };
    return Metheor;
  });

}).call(this);
