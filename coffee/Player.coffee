"use strict"
GameObject = require("./GameObject")
Bullet = require("./Bullet")

class Player extends GameObject
  constructor: () ->
    position = new PIXI.Point(0, 0)
    velocity = new PIXI.Point(0, 0)

    opts =
      position: position
      velocity: velocity
      health: 10
      lifes: 3
      speed: 8
      damage: 1
      isCollidable: true
      isMovable: true
      isShieldActive: false
      texture: "resources/img/spaceship.gif"
      shotDelay: 150
    super(opts)
    @init()
    return @

Player::init = () ->
  @position.x = GAME.renderer.width/2 - @width/2
  @position.y = GAME.renderer.height - 100

Player::shoot = ->
  return if @isDead()
  if @lastShotDate < Date.now() - @shotDelay
    velocity = new PIXI.Point(0, -1)
    position = new PIXI.Point(@position.x + @width/2, @position.y)
    opts =
      damage: @damage
      position: position
      velocity: velocity
      isCollidable: true
      isMovable: true
      speed: 10
      collidesWith: ['NPC', 'Metheor']
    bullet = new Bullet(opts)
    GAME.currentScene.addChild(bullet)
    @lastShotDate = Date.now()

Player::move = ->
  if (GAME.currentScene.constructor.name=='Level1')
    @moveLeft() if (GAME.inputManager.keyDown(GAME.inputManager.Keys.LEFT))
    @moveRight() if (GAME.inputManager.keyDown(GAME.inputManager.Keys.RIGHT))
    @moveUp() if (GAME.inputManager.keyDown(GAME.inputManager.Keys.UP))
    @moveDown() if (GAME.inputManager.keyDown(GAME.inputManager.Keys.DOWN))
    @shoot() if (GAME.inputManager.keyDown(GAME.inputManager.Keys.SPACE))

Player::onCollision = (obj) ->
  @decreaseHealth(obj.damage)
  GAME.hud.updateHealthBarAndLifes(@health, @baseHealth, @lifes)

module.exports = Player

