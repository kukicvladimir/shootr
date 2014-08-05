"use strict"

define ["Vector2", "Particle"],
(Vector2, Particle) ->
	class Emitter
		constructor: (point, velocity, spread) ->
			@position = point
			@velocity = velocity
			@spread = spread || Math.PI / 32
			@drawColor = "#999"

	Emitter::emitParticle = () ->
		angle = @velocity.getAngle() + @spread - (Math.random() * @spread)
		magnitude = @velocity.getMagnitude()

		position = new Vector2(@position.x, @position.y)
		v = new Vector2();
		velocity = v.fromAngle(angle, magnitude)

		new Particle(position, velocity)

	return Emitter