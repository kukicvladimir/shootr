"use strict"

GameObject = require("./GameObject")
Vector2 = require("./Vector2")
Bullet = require("./Bullet")

class NPC extends GameObject
  constructor: (opts...) ->
    position = opts[0].position
    velocity = opts[0].velocity
    opts =
      position: position
      velocity: velocity
      health: 3
      lifes: 1
      speed: 5
      damage: 3
      isCollidable: true
      isMovable: true
      isShieldActive: false
      shield: 0
      isDead: false
      sprite:"resources/img/alien.png"
      shotDelay: 150
    super(opts)
    return @

NPC::move = () ->
  @shoot()
  @position.x += @velocity.x * @speed
  @position.y += @velocity.y * @speed
  @velocity.x = Math.abs(@velocity.x) if @position.x < 0

  @velocity.y = Math.abs(@velocity.y) if @position.y < 0

NPC::shoot = () ->
  if Math.random() > 0.99
    position = new Vector2(@position.x + @sprite.width/2, @position.y)
    velocity = new Vector2(0, 1)
    opts =
      position: position
      velocity: velocity
      damage: @damage
      isCollidable: true
      isMovable: true
      speed: 11
      sprite: "resources/img/bullet.png"
      collidesWith: ['Player']
    bullet = new Bullet(opts)
    GAME.objects.push(bullet)
    GAME.currentScene.addChild(bullet.sprite)
    @lastShotDate = Date.now()

NPC::onCollision = ->

module.exports = NPC
