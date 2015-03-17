(function() {
  "use strict";
  var Vector2;

  Vector2 = (function() {
    function Vector2(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    }

    return Vector2;

  })();

  Vector2.prototype.add = function(vector) {
    this.x += vector.x;
    return this.y += vector.y;
  };

  Vector2.prototype.getMagnitude = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  Vector2.prototype.getAngle = function() {
    return Math.atan2(this.y, this.x);
  };

  Vector2.prototype.fromAngle = function(angle, magnitude) {
    return new Vector2(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
  };

  module.exports = Vector2;

}).call(this);
