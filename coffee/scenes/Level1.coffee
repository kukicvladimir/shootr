Scene = require("../Scene")
Player = require("../Player")
NPC = require("../NPC")
Metheor = require("../Metheor")

class Level1 extends Scene
  constructor: () ->
    super()

    @background = PIXI.Sprite.fromImage("resources/img/sky1.png")
    @background.tint=0x0000FF
    @background._uid = 999

    @background2 = PIXI.Sprite.fromImage("resources/img/sky2.png")
    @background2.tint=0x0000FF
    @background._uid = 1000

    @background.position.x = 0
    @background.position.y = 0
    @count = 0

    @addChild(@background)
    @addChild(@background2)

    @player = new Player()
    @addChild(@player)


Level1::update = ()->
  @count+=GAME.speed*10
  @background.y = @count * 0.1;
  @background.y %= @background.height * 2;

  if (@background.y > $(window).height())
    @background.y -= @background.height * 2


  @background2.y = @count * 0.1 - @background2.height;
  @background2.y %= @background2.height * 2
  if (@background2.y > $(window).height())
    @background2.y -= @background2.height * 2

  if (@count%(1000) == 0)
    metheor = new Metheor()
    @addChild(metheor, 2) #add metheor after background, so that metheors are always bellow active elements

  if (@count%5000 == 0)
    for i in [0..5]
      position = new PIXI.Point(-i*100, 300)
#      position.y = Math.random()*GAME.renderer.height/2#
      opts =
        position: position
        velocity: new PIXI.Point(1, 0)
      npc = new NPC(opts)
      @addChild(npc)

  GAME.goToScene("pause") if (GAME.inputManager.keyDown(GAME.inputManager.Keys.P))




module.exports = Level1