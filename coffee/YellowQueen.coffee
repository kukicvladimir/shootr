"use strict"

GameObject = require("./GameObject")
Bullet = require("./Bullet")

class YellowQueen extends GameObject
  constructor: (opts...) ->
    position = opts[0].position
    velocity = opts[0].velocity

    opts =
      position: position
      velocity: velocity
      health: 500
      lifes: 1
      speed: 4
      damage: 3
      isCollidable: true
      isMovable: true
      isShieldActive: false
      shield: 0
      isDead: false
      texture: "resources/img/queen.png"
      shotDelay: 150
    super(opts)
    return @
#
YellowQueen::move = () ->
  @shoot()
  @position.x += @velocity.x * @speed
  @position.y += @velocity.y * @speed
  @velocity.x = Math.abs(@velocity.x) if @position.x < 0
  @velocity.x = -@velocity.x if @position.x > GAME.renderer.width - @width

  @velocity.y = Math.abs(@velocity.y) if @position.y < 0
  @velocity.y = -@velocity.y if @position.y > GAME.renderer.height/2

  GAME.currentScene.removeChild(@) if @position.x > GAME.renderer.width + 300

YellowQueen::shoot = () ->
  if Math.random() > 0.80
    position = new PIXI.Point(@position.x + @width/2, @position.y)
    rand = Math.random()
    directionX = -2
    directionX = -1 if rand > 0.2
    directionX = 0 if rand > 0.4
    directionX = 1 if rand > 0.6
    directionX = 2 if rand > 0.8
    velocity = new PIXI.Point(directionX, 1)
    opts =
      position: position
      velocity: velocity
      damage: @damage
      isCollidable: true
      isMovable: true
      speed: 4
      collidesWith: ['Player']
    bullet = new Bullet(opts)
    GAME.currentScene.addChild(bullet)
    @lastShotDate = Date.now()

YellowQueen::onCollision = (obj)->
  @decreaseHealth(obj.damage)
  GAME.hud.updateScore(20)

module.exports = YellowQueen
