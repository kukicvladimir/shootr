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
		v = new Vector2()

		# @emitters = [new Emitter(new Vector2(@position.x, @position.y+50), v.fromAngle(-30, 1))]

	Player::moveLeft = () ->
		return if not @isMovable
		@velocity.x = -1
		@position.x += @velocity.x * @speed
		@position.x = 0 if @position.x < 0
		# @emitters[0].position.x = @position.x
		# @emitters[0].position.y = @position.y+50

	Player::moveRight = () ->
		return if not @isMovable
		@velocity.x = 1
		@position.x += @velocity.x * @speed
		if @position.x > GameLoop.renderer.width - @sprite.width
			@position.x = GameLoop.renderer.width - @sprite.width

		# @emitters[0].position.x = @position.x
		# @emitters[0].position.y = @position.y+50

	Player::moveUp = () ->
		return if not @isMovable
		@velocity.y = -1
		@position.y += @velocity.y * @speed
		if @position.y < GameLoop.renderer.height/2
			@position.y = GameLoop.renderer.height/2

		# @emitters[0].position.x = @position.x
		# @emitters[0].position.y = @position.y+50

	Player::moveDown = () ->
		return if not @isMovable
		@velocity.y = 1
		@position.y += @velocity.y * @speed
		if @position.y > GameLoop.renderer.height - @sprite.height
			@position.y = GameLoop.renderer.height - @sprite.height

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
				
	# Player::addParticles = () ->
	# 	return if @particles.length > 10
	# 	for i in [0...@emitters.length]
	# 		for j in [0..4] #emitters rate
	# 			@particles.push(@emitters[i].emitParticle())
	# 	@drawParticles()

	# Player::plotParticles = (boundsX, boundsY) ->
	# 	currentParticles = []
	# 	for i in [0...@particles.length]
	# 		particle = @particles[i]
	# 		pos = particle.position
	# 		continue if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) 

	# 		particle.move()
	# 		currentParticles.push(particle)

	# 	@particles = currentParticles

	# Player::drawParticles = () ->
	# 	graphics = new PIXI.Graphics()
	# 	GAME.stage.addChild(graphics)
	# 	for i in [0...@particles.length]
	# 		position = @particles[i].position
	# 		graphics.beginFill(0x92F72D, 1)
	# 		graphics.drawRect(position.x, position.y, 3, 3)

	return Player

