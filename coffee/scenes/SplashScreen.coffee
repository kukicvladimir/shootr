Scene = require("../Scene")

class SplashScreen extends Scene
  constructor: () ->
    super()

    @bunny = PIXI.Sprite.fromImage("resources/img/spaceship.png")
    #  // center the sprites anchor point
    @bunny.anchor.x = 0.5
    @bunny.anchor.y = 0.5
    #  // move the sprite t the center of the screen
    @bunny.position.x = $(window).width()/2 - @bunny.width/2
    @bunny.position.y = $(window).height()/2 - @bunny.height/2
    @bunny.alpha = 0
    @addChild(@bunny)

SplashScreen::update = (()->
  @bunny.alpha += 0.01 if(@bunny.alpha < 1)
  @bunny.rotation += 0.1
  if (@bunny.alpha >= 1)
    GAME.goToScene("mainMenu")
)

module.exports = SplashScreen