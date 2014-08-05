"use strict"

define [
	"GameObject"
	"Vector2"
],
(
	GameObject
	Vector2
) ->

	class Bullet extends GameObject
		constructor: (opts...) ->
			@damage = opts[0].damage
			@position = opts[0].position
			@velocity = opts[0].velocity
			@sprite = PIXI.Sprite.fromImage("resources/img/bullet.png")
			super(opts[0])
			return @

	Bullet::move = () ->
		@position.x += @velocity.x * @speed
		@position.y += @velocity.y * @speed

	return  Bullet
