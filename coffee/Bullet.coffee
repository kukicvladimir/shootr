GameObject = require("./GameObject")

class Bullet extends GameObject
  constructor: (opts...) ->
    @damage = opts[0].damage
    @position = opts[0].position
    @velocity = opts[0].velocity
    opts[0].texture = "resources/img/bullet.png"
    super(opts[0])
    return @

Bullet::move = () ->
  @position.x += @velocity.x * @speed
  @position.y += @velocity.y * @speed

Bullet::onCollision = ->
  if (@position.y > GAME.renderer.height + 300 or @position.y < -300)
    GAME.currentScene.removeChild(@)

module.exports = Bullet
