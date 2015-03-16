"use strict"

define [
	"GameObject"
	"Vector2"
	"Emitter"
	"Bullet"
],
(
	GameObject
	Vector2
	Emitter
	Bullet
) ->
	
	class Player extends GameObject
		constructor: ()->
			position = new Vector2(0, 0)
			velocity = new Vector2(0, 0)
			opts =
				position: position
				velocity: velocity
				health: 10
				lifes: 3
				speed: 8
				damage: 1
				shield: 0
				isCollidable: true
				isMovable: true
				isShieldActive: false
				sprite:"resources/img/spaceship.png"
				shotDelay: 150
			super(opts)
			@init()
			return @

	Player::init = () ->
		@particles = []
		@bullets = []
		@position.x = GameLoop.renderer.width/2 - @sprite.width/2
		@position.y = 600 #GameLoop.renderer.height - @sprite.height*2


	Player::shoot = () ->
		return if @isDead()
		@removeBullets()
		if @lastShotDate < Date.now() - @shotDelay
			velocity = new Vector2(0, -1)
			position = new Vector2(@position.x + @sprite.width/2, @position.y)
			opts = 
				damage: @damage
				position: position
				velocity: velocity							
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

