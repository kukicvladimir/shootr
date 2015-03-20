"use strict"

GameObject = require("./GameObject")
Bullet = require("./Bullet")

class NPC extends GameObject
  constructor: (opts...) ->
    position = opts[0].position
    velocity = opts[0].velocity

    opts =
      position: position
      velocity: velocity
      health: 1
      lifes: 1
      speed: 8
      damage: 3
      isCollidable: true
      isMovable: true
      isShieldActive: false
      shield: 0
      isDead: false
      texture: "resources/img/alien.png"
      shotDelay: 150
    super(opts)
    return @

NPC::move = () ->
  @shoot()
  @position.x += @velocity.x * @speed
  @position.y += @velocity.y * @speed
  @velocity.x = Math.abs(@velocity.x) if @position.x < 0

  @velocity.y = Math.abs(@velocity.y) if @position.y < 0

  GAME.currentScene.removeChild(@) if @position.x > GAME.renderer.width + 300

NPC::shoot = () ->
  if Math.random() > 0.99
    position = new PIXI.Point(@position.x + @width/2, @position.y)
    velocity = new PIXI.Point(0, 1)
    opts =
      position: position
      velocity: velocity
      damage: @damage
      isCollidable: true
      isMovable: true
      speed: 11
      collidesWith: ['Player']
    bullet = new Bullet(opts)
    GAME.currentScene.addChild(bullet)
    @lastShotDate = Date.now()

NPC::onCollision = (obj)->
  @decreaseHealth(obj.damage)

module.exports = NPC
