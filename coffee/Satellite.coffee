"use strict"
GameObject = require("./GameObject")
Bullet = require("./Bullet")

class Satellite extends GameObject
  constructor: (opts...) ->
    position = new PIXI.Point(0, 0)
    velocity = new PIXI.Point(2, 0)
    opts =
      position: position
      velocity: velocity
      health: 1
      lifes: 1
      speed: 1
      damage: 4
      isCollidable: true
      isMovable: true
      isShieldActive: false
      shield: 0
      texture:"resources/img/retard.png"
      shotDelay: 250
      collidesWith: ["Player"]
    super(opts)
    return @

Satellite::move = () ->
  @shoot()
  super
  GAME.currentScene.removeChild(@) if (@position.x > GAME.renderer.width - @width or @position.x < 0)

Satellite::shoot = () ->
  if Math.random() > 0.99
    for i in [0..2]
      position = new PIXI.Point(@position.x + @width/2, @position.y)
      velocity = new PIXI.Point(1-i, 1)
      opts =
        position: position
        velocity: velocity
        damage: @damage
        isCollidable: true
        isMovable: true
        speed: 3
      bullet = new Bullet(opts)
      GAME.currentScene.addChild(bullet)
      @lastShotDate = Date.now()

Satellite::onCollision = (obj)->
  switch obj.constructor.name
    when 'Bullet'
      @decreaseHealth(obj.damage)
      GAME.hud.updateScore(100)
    when 'Player', 'Metheor' then @decreaseLifes()

module.exports = Satellite
