"use strict"
GameObject = require('./GameObject')

class Metheor extends GameObject
  constructor: (opts...) ->
    position = new PIXI.Point(0, 0)
    isCollidable = if Math.random() > 0.5 then true else false
    dirx = [-2, -1, 0, 1, 2]
    dx = dirx[Math.round(Math.random()*dirx.length)]
    velocity = new PIXI.Point(dx, 2)
    opts =
      position: position
      health: 3
      lifes: 1
      speed: 3
      damage: 3
      velocity: velocity
      isCollidable: isCollidable
      isMovable: true
      isDead: false
      texture:"resources/img/metheor.png"
      collidesWith: ["Player"]
    super(opts)
    @init()
    return @

Metheor::init = () ->
  @position.x = Math.random() * (GAME.renderer.width / 2)
  @position.y = -300
  @position = @position
  if not @isCollidable
    @tint = 0x333333
  size = Math.random() * 0.3
  @speed = (30-size*100) / 3 #smaller metheors go faster
  @health = size*20
  @damage = size * 20
  @anchor.x = 0.5
  @anchor.y = 0.5
  @scale.x = size
  @scale.y = size
  @direction = Math.random() * Math.PI * 2
  @turningSpeed = Math.random() - 0.8

Metheor::move = () ->
  @position.x += @velocity.x * @speed
  @position.y += @velocity.y * @speed
  @direction += -@turningSpeed * 0.1
  @rotation = @direction - Math.PI/2;

  GAME.currentScene.removeChild(@) if (@position.y > GAME.renderer.height)

Metheor::onCollision = (obj) ->
  @decreaseHealth(obj.damage)
  GAME.hud.updateScore(Math.round(@speed)) #lets say faster it is more points you get


module.exports = Metheor
