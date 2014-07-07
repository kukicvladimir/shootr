"use strict"

define [
	"GameObject"
	"Bullet"
],
(
	GameObject
	Bullet
) ->

	class RetardedNPC extends GameObject
		constructor: (opts...) ->
			opts =
				x: 0
				y: 0
				health: 1
				lifes: 1
				speed: 1
				damage: 1
				dx: 2
				dy: 0
				isCollidable: true
				isMovable: true
				isShieldActive: false
				shield: 0
				sprite:"resources/img/retard.png"
				shotDelay: 150
			super(opts)
			@init()
			return @

	RetardedNPC::init = () ->
		@bullets = []
		@sprite.position.x = Math.random() * (HAL.renderer.width / 2)
		@sprite.position.y = Math.random() * (HAL.renderer.height / 2 )
		@move()

	RetardedNPC::move = () ->
		if not @isDead()
			@shoot()
		return if @isDead()
		return if not @isMovable
		@sprite.position.x += @dx*@speed
		@sprite.position.y += @dy*@speed
		@dx = Math.abs(@dx) if @sprite.position.x < 0
		@dx = -@dx if @sprite.position.x > HAL.renderer.width - @sprite.width


	RetardedNPC::shoot = () ->
		@removeBullets()
		if Math.random() > 0.99
			for i in [0..2]
				opts = 
					damage: @damage
					dx: 1-i
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

	RetardedNPC::removeBullet = (id) ->
		for bullet in @bullets
			if bullet?.uid is id
				ind = @bullets.indexOf(bullet)
				GAME.stage.removeChild(bullet.sprite)
				@bullets.splice(ind, 1)
				
	RetardedNPC::removeBullets = () ->
		for bullet in @bullets
			if bullet?.sprite.position.y > HAL.renderer.height
				ind = @bullets.indexOf(bullet)
				GAME.stage.removeChild(bullet.sprite)
				@bullets.splice(ind, 1)

	return  RetardedNPC
