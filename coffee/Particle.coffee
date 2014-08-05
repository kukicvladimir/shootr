"use strict"

define ["Vector2"],
(Vector2) ->
	class Particle
		constructor: (point, velocity, acceleration) ->
			@position = point || new Vector2(0, 0)
			@velocity = velocity || new Vector2(0, 0)
			@acceleration = acceleration || new Vector2(0, 0)

	Particle::move = () ->
		@velocity.add(@acceleration)
		@position.add(@velocity)

	return Particle