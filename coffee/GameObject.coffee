"use strict"
PIXI = require("../js/vendor/pixi/bin/pixi.dev.js")
Geometry = require("./Geometry")

UID = 0
class GameObject extends PIXI.Sprite
  constructor: (opts...)->
    img = new Image()
    img.src = opts[0].texture
    base = new PIXI.BaseTexture(img)
    texture = new PIXI.Texture(base)


    super(texture)
    ###
    Unique object identifier
    ###
    @_uid = UID++

    ###
    Object position
    ###
    @position = opts[0].position
    ###
    Object speed
    ###
    @speed = GAME.speed + opts[0].speed

    ###
    Object velocity
    ###
    @velocity = opts[0].velocity

    ###
    Object health
    ###
    @health = opts[0].health

    ###
    Object base health - used for HUD calculation only
    ###
    @baseHealth = opts[0].health

    ###
    Object lifes - integer value
    Number of object lifes
    ###
    @lifes = opts[0].lifes

    ###
    Object damage - integer value
    ###
    @damage = opts[0].damage

    ###
    Object isMovable - boolean value
    determines if object is movable
    ###
    @isMovable = opts[0].isMovable || false

    ###
    Object isCollidable - boolean value
    determines if object is collidable
    ###
    @isCollidable = opts[0].isCollidable || false

    ###
    Object collidesWith - list
    list of collidable objects
    ###
    @collidesWith = opts[0].collidesWith || []

    ###
    Object lastShotDate - date
    used to determine if Object can shoot (depends on shotDelay
    ###
    @lastShotDate = null

    ###
    Object shotDelay- integer value
    shot delay in milliseconds
    ###
    @shotDelay = opts[0].shotDelay


    ###
    blink interval used when respawning
    ###
    @respawnAnimationInterval = null

    ###
    Sound played when object shoots
    ###
    @shootAudio = new Audio(opts[0].shootAudio)

    ###
    Sound played when object dies
    ###
    @deadAudio = new Audio(opts[0].deadAudio)

    return @

###
  get type of object
###
GameObject::getObjectType = () ->
  return @constructor.name

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
increase number of lifes
###
GameObject::increaseLifes = () ->
  @lifes++

###
decrease number of lifes
###
GameObject::decreaseLifes = () ->
  @lifes--
  @playDeadAudio()
  if @lifes is 0
    GAME.goToScene("gameOver") if @constructor.name == 'Player'
    GAME.currentScene.removeChild(@)
  else
    @respawn()

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
    @decreaseLifes()
    if @lifes <= 0
      @health = 0
    else
      @health = @baseHealth


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

###
move object in specified direction
###
GameObject::moveTo = (x, y) ->
  return if @isDead()
  return if not @isMovable
  @position.x += x * @speed * GAME.speed
  @position.y += y * @speed * GAME.speed

###
Move object to left
###
GameObject::moveLeft = () ->
  return if not @isMovable
  @velocity.x = -1
  @position.x += @velocity.x * @speed * GAME.speed
  @position.x = 0 if @position.x < 0

###
Move object to right
###
GameObject::moveRight = () ->
  return if not @isMovable
  @velocity.x = 1
  @position.x += @velocity.x * @speed * GAME.speed
  if @position.x > GAME.renderer.width - @width
    @position.x = GAME.renderer.width - @width

###
Move object up
###
GameObject::moveUp = () ->
  return if not @isMovable
  @velocity.y = -1
  @position.y += @velocity.y * @speed * GAME.speed
  if @position.y < GAME.renderer.height / 2
    @position.y = GAME.renderer.height / 2

###
Move object down
###
GameObject::moveDown = () ->
  return if not @isMovable
  @velocity.y = 1
  @position.y += @velocity.y * @speed * GAME.speed
  if @position.y > GAME.renderer.height - @height
    @position.y = GAME.renderer.height - @height


###
  Move object using velocity
###
GameObject::move = () ->
  @position.x += @velocity.x * @speed
  @position.y += @velocity.y * @speed

###
Blink object to specified color
###
GameObject::blinkMe = () ->
  @tint = 0xFF0000
  setTimeout(
    () =>
      @tint = 0xFFFFFF
  , 50)

GameObject::respawnBlink = () ->
  @tint = 0x00FF00
  @alpha = 0.2
  @respawnAnimationInterval = setInterval(
    () =>
      if @tint is 0x00FF00
        @tint = 0xFFFFFF
      else
        @tint = 0x00FF00
  , 20)

GameObject::respawn = () ->
  @setCollidable(false)
  @respawnBlink()
  setTimeout( () =>
    clearInterval(@respawnAnimationInterval)
    @setCollidable(true)
    @tint = 0xFFFFFF
    @alpha = 1
  , 2000)

###
Resolve collisions - Iterater through all game  objects and  resolve collisions on collided objects
###
GameObject::resolveCollisions = ->
  for object in GAME.currentScene.children
    if object != @ and !!object?.isCollidable and $.inArray(object.getObjectType(), @collidesWith) isnt -1
      if Geometry.rectangleIntersectsRectangle(@, object)
        object.onCollision(this)
        this.onCollision(object)

GameObject::update = ->
  @move() if @isMovable
  @resolveCollisions() if @isCollidable

GameObject::playShootAudio = ->
  @shootAudio.play()

GameObject::playDeadAudio = ->
  @deadAudio.play()

module.exports = GameObject

