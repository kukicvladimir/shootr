(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  define(["GameObject"], function(GameObject) {
    var Bullet;
    Bullet = (function(_super) {
      __extends(Bullet, _super);

      function Bullet() {
        var opts;
        opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        Bullet.__super__.constructor.call(this, opts[0]);
        this.init(opts[0].x, opts[0].y);
        return this;
      }

      return Bullet;

    })(GameObject);
    Bullet.prototype.init = function(x, y) {
      this.sprite.position.x = x;
      return this.sprite.position.y = y;
    };
    Bullet.prototype.move = function() {
      this.sprite.position.x += this.dx * this.speed;
      return this.sprite.position.y += this.dy * this.speed;
    };
    return Bullet;
  });

}).call(this);
