(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  define(["GameObject", "Vector2"], function(GameObject, Vector2) {
    var Bullet;
    Bullet = (function(_super) {
      __extends(Bullet, _super);

      function Bullet() {
        var opts;
        opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        this.damage = opts[0].damage;
        this.position = opts[0].position;
        this.velocity = opts[0].velocity;
        this.sprite = PIXI.Sprite.fromImage("resources/img/bullet.png");
        Bullet.__super__.constructor.call(this, opts[0]);
        return this;
      }

      return Bullet;

    })(GameObject);
    Bullet.prototype.move = function() {
      this.position.x += this.velocity.x * this.speed;
      return this.position.y += this.velocity.y * this.speed;
    };
    return Bullet;
  });

}).call(this);
