"use strict"

define [
	"GameObject"
],
(
	GameObject
) ->

	class Metheor extends GameObject
		constructor: (opts...) ->
			isCollidable = if Math.random() > 0.5 then true else false
			dirx = [-2, -1, 0, 1, 2]
			dx = dirx[Math.round(Math.random()*dirx.length)]
			opts =
				x: 0
				y: 0
				health: 3
				lifes: 1
				speed: 3
				damage: 3
				dx: dx
				dy: 2
				isCollidable: isCollidable
				isMovable: true
				isShieldActive: false
				shield: 0
				isDead: false
				sprite:"resources/img/metheor.png"
				shotDelay: 150
			super(opts)
			@init()
			return @

	Metheor::init = () ->
		@sprite.position.x = Math.random() * (HAL.renderer.width / 2)
		@sprite.position.y = -300
		if not @isCollidable
			@sprite.tint = 0x222222
		size = Math.random() * 0.3
		@speed = (30-size*100) / 3#smaller metheors go faster
		@health = size*20
		@sprite.anchor.x = 0.5
		@sprite.anchor.y = 0.5
		@sprite.scale.x = size
		@sprite.scale.y = size
		@direction = Math.random() * Math.PI * 2
		@turningSpeed = Math.random() - 0.8
		@move()

	Metheor::move = () ->
		@sprite.position.x += @dx*@speed
		@sprite.position.y += @dy*@speed
		@direction += -@turningSpeed * 0.1
		@sprite.rotation = @direction - Math.PI/2;
		



	return  Metheor
