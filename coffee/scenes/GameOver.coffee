Scene = require("../Scene")

class GameOverMenu extends Scene
  constructor: () ->
    super()
    @title = new PIXI.Text("GAME OVER", {font: "150px Pixelate", fill: "#FF0000", align: "center", stroke: "#FFFFFF", strokeThickness: 6})
    @title.position.x = $(window).width()/2 - @title.width/2
    @title.position.y = $(window).height()/2 - @title.height/2

    @anyKey = new PIXI.Text("PRESS 'R' TO RESTART", {font: "18px Snippet", fill: "white", align: "left"})
    @anyKey.position.x = $(window).width()/2 - @anyKey.width/2
    @anyKey.position.y = $(window).height()/2 + @title.height/2

    @background = PIXI.Sprite.fromImage("resources/img/sky1.png")
    @background2 = PIXI.Sprite.fromImage("resources/img/sky2.png")
    @background.position.x = 0
    @background.position.y = 0

    @addChild(@background)
    @addChild(@background2)

    @addChild(@title)
    @addChild(@anyKey)

GameOverMenu::update = () ->
  if (GAME.inputManager.keyDown(GAME.inputManager.Keys.R))
    GAME.scenes.level1.reset()
    GAME.goToScene("level1")

  @background.y -= 0.1
  @background.y %= @background.height * 2
  @background.y -= @background.height*2 if (@background.y>$(window).height())

  @background2.y -= 0.1 - @background2.height
  @background2.y %= @background2.height * 2
  @background2.y -= @background2.height*2 if (@background2.y>$(window).height())

module.exports = GameOverMenu