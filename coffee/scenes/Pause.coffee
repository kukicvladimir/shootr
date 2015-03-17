Scene = require("../Scene")

class PauseMenu extends Scene
  constructor: () ->
    super()
    @title = new PIXI.Text("GAME PAUSED", {font: "150px Arial", fill: "#5ACAFA", align: "center", stroke: "#FFFFFF", strokeThickness: 6})
    @title.position.x = $(window).width()/2 - @title.width/2
    @title.position.y = $(window).height()/2 - @title.height/2

    @anyKey = new PIXI.Text("PRESS ANY KEY TO CONTINUE", {font: "18px Snippet", fill: "white", align: "left"})
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

    #controlls
    onKeyDown = (evt) ->
      if (evt.keyCode != undefined)
        GAME.paused = false
        GAME.goToScene("level1")

    onKeyUp = (evt) ->

    $(document).keydown(onKeyDown)
    $(document).keyup(onKeyUp)

PauseMenu::update = () ->
  @background.y -= 0.1
  @background.y %= @background.height * 2
  @background.y -= @background.height*2 if (@background.y>$(window).height())

  @background2.y -= 0.1 - @background2.height
  @background2.y %= @background2.height * 2
  @background2.y -= @background2.height*2 if (@background2.y>$(window).height())

module.exports = PauseMenu