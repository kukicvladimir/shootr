(function() {
  "use strict";
  define(["Vector2"], function(Vector2) {
    var Particle;
    Particle = (function() {
      function Particle(point, velocity, acceleration) {
        this.position = point || new Vector2(0, 0);
        this.velocity = velocity || new Vector2(0, 0);
        this.acceleration = acceleration || new Vector2(0, 0);
      }

      return Particle;

    })();
    Particle.prototype.move = function() {
      this.velocity.add(this.acceleration);
      return this.position.add(this.velocity);
    };
    return Particle;
  });

}).call(this);
