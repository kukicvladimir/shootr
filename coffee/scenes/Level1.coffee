Scene = require("../Scene")
Player = require("../Player")
NPC = require("../NPC")
Satellite = require("../Satellite")
YellowQueen = require("../YellowQueen")
Metheor = require("../Metheor")
HUDManager = require("../HUDManager")
levelScript = require("../../resources/json/level.json")

class Level1 extends Scene
  constructor: () ->
    super()
    @init()

Level1::init = () ->
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
  GAME.hud = new HUDManager(@)


Level1::reset = () ->
  @count = 0
  @removeChildren()
  @init()

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

  @count = 0 if @count > 240000 #TODO: change to real loop end when last queen dies
  if (@count%(1000) == 0)
    metheor = new Metheor()
    @addChild(metheor, 2) #add metheor after background, so that metheors are always bellow active elements

  if (!!levelScript[@count])
    for key, props of levelScript[@count]
      for i in [0...props.count]
        position = new PIXI.Point(props.position.x-i*100, props.position.y)
        opts =
          position: position
          velocity: new PIXI.Point(props.velocity.x, props.velocity.y)
#
        switch key
          when "NPC" then npc = new NPC(opts)
          when "Satellite" then npc = new Satellite(opts)
          when "YellowQueen" then npc = new YellowQueen(opts)
        @addChild(npc)


  GAME.goToScene("pause") if (GAME.inputManager.keyDown(GAME.inputManager.Keys.P))




module.exports = Level1