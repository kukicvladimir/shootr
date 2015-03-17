"use strict"

GameObject = require("./GameObject")
Vector2 = require("./Vector2")
Bullet = require("./Bullet")

class NPC extends GameObject
  constructor: (opts...) ->
    position = new Vector2(0, 0)
    velocity = new Vector2(2, 2)
    opts =
      position: position
      velocity: velocity
      health: 3
      lifes: 1
      speed: 2
      damage: 3
      isCollidable: true
      isMovable: true
      isShieldActive: false
      shield: 0
      isDead: false
      sprite:"resources/img/alien.png"
      shotDelay: 150
    super(opts)
    @init()
    return @

NPC::init = () ->
  @bullets = []
  @position.x = Math.random() * (GameLoop.renderer.width / 2)
  @position.y = Math.random() * ((GameLoop.renderer.height - 200)/ 2 )
  @move()

NPC::move = () ->
  if not @isDead()
    @shoot()
  return if @isDead()
  return if not @isMovable
  @position.x += @velocity.x * @speed
  @position.y += @velocity.y * @speed
  @velocity.x = Math.abs(@velocity.x) if @position.x < 0
  @velocity.x = -@velocity.x if @position.x > GameLoop.renderer.width - @sprite.width

  @velocity.y = Math.abs(@velocity.y) if @position.y < 0
  @velocity.y = -@velocity.y if @position.y > (GameLoop.renderer.height - @sprite.height)/2

NPC::shoot = () ->
  @removeBullets()
  if Math.random() > 0.99
    position = new Vector2(@position.x + @sprite.width/2, @position.y)
    velocity = new Vector2(0,1)
    opts =
      position: position
      velocity: velocity
      damage: @damage
      isCollidable: true
      isMovable: true
      speed: 11
      sprite: "resources/img/bullet.png"
    bullet = new Bullet(opts)
    @bullets.push bullet
    GAME.stage.addChild(bullet.sprite)
    @lastShotDate = Date.now()

NPC::removeBullet = (id) ->
  for bullet in @bullets
    if bullet?.uid is id
      ind = @bullets.indexOf(bullet)
      GAME.stage.removeChild(bullet.sprite)
      @bullets.splice(ind, 1)

NPC::removeBullets = () ->
  for bullet in @bullets
    if bullet?.position.y > GameLoop.renderer.height
      ind = @bullets.indexOf(bullet)
      GAME.stage.removeChild(bullet.sprite)
      @bullets.splice(ind, 1)

module.exports = NPC
