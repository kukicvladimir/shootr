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
      speed: 4
      damage: 1
      isCollidable: true
      isMovable: true
      isShieldActive: false
      shield: 0
      isDead: false
      texture: "resources/img/alien.png"
      deadAudio: "resources/sound/EnemyDeath.ogg"
      shootAudio: "resources/sound/NPCShoot.ogg"
      shotDelay: 150
      collidesWith: ["Player", "Metheor"]
    super(opts)
    return @

NPC::move = () ->
  @shoot()
  super
  GAME.currentScene.removeChild(@) if (@position.x > GAME.renderer.width - @width or @position.x < 0)
  GAME.currentScene.removeChild(@) if @position.y > GAME.renderer.height

NPC::shoot = () ->
  if Math.random() > 0.99
    @playShootAudio()
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
  switch obj.getObjectType()
    when 'Bullet'
      @decreaseHealth(obj.damage)
      GAME.hud.updateScore(50)
    when 'Player', 'Metheor' then @decreaseLifes()


module.exports = NPC
