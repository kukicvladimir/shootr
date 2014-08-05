"use strict"

define [
],
(
) ->
	class Vector2
		constructor: (x, y) ->
			@x = x || 0
			@y = y || 0

	# Add a vector to another
	Vector2::add = (vector) ->
		@x += vector.x
		@y += vector.y

	# Gets the length of the vector
	Vector2::getMagnitude = () ->
		return Math.sqrt(this.x * this.x + this.y * this.y)

	# Gets the angle accounting for the quadrant we're in
	Vector2::getAngle = () ->
		return Math.atan2(this.y,this.x)

	# Allows us to get a new vector from angle and magnitude
	Vector2::fromAngle = (angle, magnitude) ->
		return new Vector2(magnitude * Math.cos(angle), magnitude * Math.sin(angle))


	return Vector2