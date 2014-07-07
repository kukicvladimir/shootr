"use strict"

define [
	"GameObject"
	"Bullet"
],
(
	GameObject
	Bullet
) ->

	class NPC extends GameObject
		constructor: (opts...) ->
			opts =
				x: 0
				y: 0
				health: 3
				lifes: 1
				speed: 2
				damage: 3
				dx: 2
				dy: 2
				isCollidable: true
				isMovable: true
				isShieldActive: false
				shield: 0
				isDead: false
				sprite:"resources/img/alien.png"
				shotDelay: 150
			super(opts)
			@init()
			return @

	NPC::init = () ->
		@bullets = []
		@sprite.position.x = Math.random() * (HAL.renderer.width / 2)
		@sprite.position.y = Math.random() * ((HAL.renderer.height - 200)/ 2 )
		@move()

	NPC::move = () ->
		if not @isDead()
			@shoot()
		return if @isDead()
		return if not @isMovable
		@sprite.position.x += @dx*@speed
		@sprite.position.y += @dy*@speed
		@dx = Math.abs(@dx) if @sprite.position.x < 0
		@dx = -@dx if @sprite.position.x > HAL.renderer.width - @sprite.width

		@dy = Math.abs(@dy) if @sprite.position.y < 0
		@dy = -@dy if @sprite.position.y > (HAL.renderer.height - @sprite.height)/2

	NPC::shoot = () ->
		@removeBullets()
		if Math.random() > 0.99
			opts = 
				damage: @damage
				dx: 0
				dy: 1
				y: @sprite.position.y
				x: @sprite.position.x + @sprite.width/2
				directionX: 1
				directionY: 1
				isCollidable: true
				isMovable: true
				speed: 11
				sprite: "resources/img/bullet.png"
			bullet = new Bullet(opts)
			@bullets.push bullet
			GAME.stage.addChild(bullet.sprite)
			@lastShotDate = Date.now()

	NPC::removeBullet = (id) ->
		for bullet in @bullets
			if bullet?.uid is id
				ind = @bullets.indexOf(bullet)
				GAME.stage.removeChild(bullet.sprite)
				@bullets.splice(ind, 1)
				
	NPC::removeBullets = () ->
		for bullet in @bullets
			if bullet?.sprite.position.y > HAL.renderer.height
				ind = @bullets.indexOf(bullet)
				GAME.stage.removeChild(bullet.sprite)
				@bullets.splice(ind, 1)

	return  NPC
