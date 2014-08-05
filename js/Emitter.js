(function() {
  "use strict";
  define(["Vector2", "Particle"], function(Vector2, Particle) {
    var Emitter;
    Emitter = (function() {
      function Emitter(point, velocity, spread) {
        this.position = point;
        this.velocity = velocity;
        this.spread = spread || Math.PI / 32;
        this.drawColor = "#999";
      }

      return Emitter;

    })();
    Emitter.prototype.emitParticle = function() {
      var angle, magnitude, position, v, velocity;
      angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread);
      magnitude = this.velocity.getMagnitude();
      position = new Vector2(this.position.x, this.position.y);
      v = new Vector2();
      velocity = v.fromAngle(angle, magnitude);
      return new Particle(position, velocity);
    };
    return Emitter;
  });

}).call(this);
