"use strict"

define [
	"GameObject"
	"Vector2"
],
(
	GameObject
	Vector2
) ->

	class Metheor extends GameObject
		constructor: (opts...) ->
			position = new Vector2(0, 0)
			isCollidable = if Math.random() > 0.5 then true else false
			dirx = [-2, -1, 0, 1, 2]
			dx = dirx[Math.round(Math.random()*dirx.length)]
			velocity = new Vector2(dx, 2)
			opts =
				position: position
				health: 3
				lifes: 1
				speed: 3
				damage: 3
				velocity: velocity
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
		@position.x = Math.random() * (GameLoop.renderer.width / 2)
		@position.y = -300
		@sprite.position = @position
		if not @isCollidable
			@sprite.tint = 0x333333
		size = Math.random() * 0.3
		@speed = (30-size*100) / 3#smaller metheors go faster
		@health = size*20
		@damage = size * 20
		@sprite.anchor.x = 0.5
		@sprite.anchor.y = 0.5
		@sprite.scale.x = size
		@sprite.scale.y = size
		@direction = Math.random() * Math.PI * 2
		@turningSpeed = Math.random() - 0.8
		@move()

	Metheor::move = () ->
		@position.x += @velocity.x * @speed
		@position.y += @velocity.y * @speed
		@direction += -@turningSpeed * 0.1
		@sprite.rotation = @direction - Math.PI/2;
		
	return  Metheor
