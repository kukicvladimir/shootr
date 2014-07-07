"use strict"

define [
	"GameObject"
	"Bullet"
],
(
	GameObject
	Bullet
) ->
	
	class Player extends GameObject
		constructor: ()->
			opts =
				x: 0
				y: 0
				health: 10
				lifes: 3
				speed: 8
				damage: 1
				isCollidable: true
				isMovable: true
				isShieldActive: false
				shield: 0
				sprite:"resources/img/spaceship.gif"
				shotDelay: 150
			super(opts)
			@init()
			return @

	Player::init = () ->
		@bullets = []
		@sprite.position.x = HAL.renderer.width/2 - @sprite.width/2
		@sprite.position.y = HAL.renderer.height - 64

	Player::moveLeft = () ->
		return if not @isMovable
		@sprite.position.x -= @speed
		@sprite.position.x = 0 if @sprite.position.x < 0

	Player::moveRight = () ->
		return if not @isMovable
		@sprite.position.x += @speed
		if @sprite.position.x > HAL.renderer.width - @sprite.width
			@sprite.position.x = HAL.renderer.width - @sprite.width

	Player::moveUp = () ->
		return if not @isMovable
		@sprite.position.y -= @speed
		if @sprite.position.y < HAL.renderer.height/2
			@sprite.position.y = HAL.renderer.height/2

	Player::moveDown = () ->
		return if not @isMovable
		@sprite.position.y += @speed
		if @sprite.position.y > HAL.renderer.height - @sprite.height
			@sprite.position.y = HAL.renderer.height - @sprite.height

	Player::shoot = () ->
		return if @isDead()
		@removeBullets()
		if @lastShotDate < Date.now() - @shotDelay
			opts = 
				damage: @damage
				dx: 0
				dy: -1
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

	Player::removeBullet = (id) ->
		for bullet in @bullets
			if bullet?.uid is id
				ind = @bullets.indexOf(bullet)
				GAME.stage.removeChild(bullet.sprite)
				@bullets.splice(ind, 1)

	Player::removeBullets = () ->
		for bullet in @bullets
			if bullet?.sprite.position.y < 0
				ind = @bullets.indexOf(bullet)
				GAME.stage.removeChild(bullet.sprite)
				@bullets.splice(ind, 1)
				

	return Player

