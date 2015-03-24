"use strict"
GameObject = require("./GameObject")
Vector2 = require("./Vector2")
Bullet = require("./Bullet")

class RetardedNPC extends GameObject
  constructor: (opts...) ->
    position = new Vector2(0, 0)
    velocity = new Vector2(2, 0)
    opts =
      position: position
      velocity: velocity
      health: 1
      lifes: 1
      speed: 1
      damage: 1
      isCollidable: true
      isMovable: true
      isShieldActive: false
      shield: 0
      sprite:"resources/img/retard.png"
      shotDelay: 150
    super(opts)
    @init()
    return @

RetardedNPC::move = () ->
  @shoot()
  @position.x += @velocity.x * @speed
  @position.y += @velocity.y * @speed
  @velocity.x = Math.abs(@velocity.x) if @position.x < 0
  @velocity.x = -@velocity.x if @position.x > GameLoop.renderer.width - @sprite.width


RetardedNPC::shoot = () ->
  if Math.random() > 0.99
    for i in [0..2]
      position = new PIXI.Point(@position.x + @sprite.width/2, @position.y)
      velocity = new PIXI.Point(1-i, 1)
      opts =
        position: position
        velocity: velocity
        damage: @damage
        isCollidable: true
        isMovable: true
        speed: 11
        sprite: "resources/img/bullet.png"
      bullet = new Bullet(opts)
      GAME.currentScene.addChild(bullet.sprite)
      @lastShotDate = Date.now()

module.exports = RetardedNPC
