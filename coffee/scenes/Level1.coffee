Scene = require("../Scene")
Player = require("../Player")

class Level1 extends Scene
  constructor: () ->
    super()

    @background = PIXI.Sprite.fromImage("resources/img/sky1.png")
    @background.tint=0x0000FF
    @background2 = PIXI.Sprite.fromImage("resources/img/sky2.png")
    @background.position.x = 0
    @background.position.y = 0

    @addChild(@background)
    @addChild(@background2)

    @player = new Player()
    @addChild(@player.sprite)

Level1::update = (()->
  @player.moveLeft() if (GAME.inputManager.keyDown(GAME.inputManager.Keys.LEFT))
  @player.moveRight() if (GAME.inputManager.keyDown(GAME.inputManager.Keys.RIGHT))
  @player.moveUp() if (GAME.inputManager.keyDown(GAME.inputManager.Keys.UP))
  @player.moveDown() if (GAME.inputManager.keyDown(GAME.inputManager.Keys.DOWN))
  @player.shoot() if (GAME.inputManager.keyDown(GAME.inputManager.Keys.SPACE))
  GAME.goToScene("pause") if (GAME.inputManager.keyDown(GAME.inputManager.Keys.P))
  #paralax background

  @background.y += 0.1
  @background.y %= @background.height * 2
  @background.y += @background.height*2 if (@background.y>$(window).height())

  @background2.y += 0.1 - @background2.height
  @background2.y %= @background2.height * 2
  @background2.y += @background2.height*2 if (@background2.y>$(window).height())

  #move bullets
  for bullet in @player.bullets
#    if GAME.npcs
#      for npc in GAME.npcs
#        continue if npc.isDead()
#        if bullet and Geometry.rectangleIntersectsRectangle(bullet.sprite.getBounds(), npc.sprite.getBounds())
#          npc.decreaseHealth(bullet.damage)
#          GAME.Hud.updateScore(50)
#          GAME.player.removeBullet(bullet.uid)
#
#    for metheor in GAME.metheors
#      continue if metheor.isDead()
#      continue if not metheor.isCollidable
#      #check if player is hit by metheor
#      if Geometry.rectangleIntersectsRectangle(metheor.sprite.getBounds(), GAME.player.sprite.getBounds())
#        GAME.player.decreaseHealth(metheor.damage)

#      if bullet and Geometry.rectangleIntersectsRectangle(bullet.sprite.getBounds(), metheor.sprite.getBounds())
#        metheor.decreaseHealth(bullet.damage)
#        GAME.Hud.updateScore(50)
#        GAME.player.removeBullet(bullet.uid)
    bullet?.move()
)

module.exports = Level1