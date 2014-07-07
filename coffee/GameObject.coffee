"use strict"

define [
	"EventDispatcher"
],
(
	EventDispatcher
) ->
	
	UID = 0
	class GameObject extends EventDispatcher
		constructor: (opts...)->
			super
			@uid = UID++
			@x = opts[0].x
			@y = opts[0].y
			@health = opts[0].health
			@baseHealth = opts[0].health
			@lifes = opts[0].lifes
			@speed = GAME.speed + opts[0].speed
			@damage = opts[0].damage
			@isShieldActive = opts[0].isShieldActive
			@dx = opts[0].dx
			@dy = opts[0].dy
			@isMovable = opts[0].isMovable || false
			@isCollidable = opts[0].isCollidable || false
			@sprite = PIXI.Sprite.fromImage(opts[0].sprite)
			@lastShotDate = null
			# @healthBar = new PIXI.Graphics()
			
			@shotDelay = opts[0].shotDelay
			return @

	###
	set if game object is movable or not
	set movable to true/false
	###
	GameObject::setMovable = (movable) ->
		@isMovable = movable

	###
	set if game object is collidable or not
	set isCollidable to true/false
	###
	GameObject::setCollidable = (collidable) ->
		@isCollidable = collidable

	###
	set shieldActive to true/false
	###
	GameObject::setShieldActive = (active) ->
		@isShieldActive = active
	
	###
	update the number of lifes of game object
	###
	GameObject::updateLifes = (lifes) ->
		@lifes += lifes
		@lifes = 0 if @lifes <= 0

	###
	decrease health of the object if shield is not active
	reduces number of lifes left and resets health to base health
	if there are lifes left
	###
	GameObject::decreaseHealth = (damage) ->
		return if @isShieldActive
		@health -= parseInt(damage)
		@blinkMe()
		if @health <= 0	
			@updateLifes(-1)
			if @lifes <= 0
				@health = 0
			else
				@health = @baseHealth
			
		if @lifes is 0
			GAME.stage.removeChild(@sprite)

	###
	check if object is dead
	###
	GameObject::isDead = () ->
		return @lifes <= 0

	###
	update the health of game object
	###
	GameObject::increaseHealth = (health) ->
		@health += health
		@health = @baseHealth if @health > @baseHealth

	###
	increase speed of game object if isMovable
	###
	GameObject::updateSpeed = (speed) ->
		return if not @isMovable
		@speed += speed

	GameObject::blinkMe = () ->
		@sprite.tint = 0xFF0000
		setTimeout(
			() => 	
				@sprite.tint = 0xFFFFFF
		,50)

	GameObject::respawnBlink = () ->
		@sprite.tint = 0x0000FF
		setTimeout(
			() => 	
				@sprite.tint = 0xFFFFFF
		,2000)

	GameObject::respawn = () ->
		@setCollidable(false)
		setTimeout(
			@respawnBlink()
			@setCollidable(true)
		,2000)
		
	return GameObject

