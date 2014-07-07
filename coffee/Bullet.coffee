"use strict"

define [
	"GameObject"
],
(
	GameObject
) ->

	class Bullet extends GameObject
		constructor: (opts...) ->
			# @id = COUNT++
			# @damage = opts[0].damage
			# @dx = opts[0].dx
			# @dy = opts[0].dy
			# @bulletSpeed = 2
			# @directionX = opts[0].directionX
			# @directionY = opts[0].directionY
			# @sprite = PIXI.Sprite.fromImage("resources/img/bullet.png")
			super(opts[0])
			@init(opts[0].x, opts[0].y)
			return @

	Bullet::init = (x, y) ->
		@sprite.position.x = x
		@sprite.position.y = y

	#bullet has directon +1 -1
	Bullet::move = () ->
		@sprite.position.x += @dx*@speed
		@sprite.position.y += @dy*@speed

	return  Bullet
