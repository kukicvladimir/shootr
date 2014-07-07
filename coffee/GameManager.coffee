"use strict"

define [
	"EventDispatcher"
	"HUDManager" 
	"AssetsLoader"
	"Player"
	"NPC"
	"RetardedNPC"
],
(EventDispatcher
	HUDManager
	AssetsLoader
	Player
	NPC
	RetardedNPC
) ->
	
	class GameManager extends EventDispatcher
		constructor: () ->
			super
			@speed = 1
			@rightButton = false
			@leftButton = false
			@upButton = false
			@downButton = false
			@shootButton = false
			@init()

	GameManager::init = ->
		@assets = new AssetsLoader()
		@metheors = []
		return

	GameManager::start = ->
		@startGame()

	GameManager::startGame = ->
		@assets.showSpinner()
		@assets.load()
		@stage = new PIXI.Stage(0xFFFFFF)
		
		@gameover = PIXI.Sprite.fromImage("resources/img/gameover.png")
		@background = PIXI.Sprite.fromImage("resources/img/sky1.png")
		@background2 = PIXI.Sprite.fromImage("resources/img/sky2.png")
		@background.position.x = 0
		@background.position.y = 0

		@gameover.visible = false
		@stage.addChild(@background)
		@stage.addChild(@background2)
		@player = new Player()
		@stage.addChild(@player.sprite)
		@stage.addChild(@gameover)
		#@stage.addChild(@player.healthBar)

		@Hud = new HUDManager()

		@npcs = []
		for i in [0...10]
			npc = new NPC()
			@stage.addChild(npc.sprite)
			@npcs.push npc

		for i in [0...3]
			retardedNPC = new RetardedNPC()
			@stage.addChild(retardedNPC.sprite)
			@npcs.push retardedNPC

		HAL.startRendering(@stage)
		@assets.hideSpinner()
		# @Hud.showDialog("MAIN_MENU")

	GameManager::gameOver = () ->
		GAME.player.setCollidable(false)
		@gameover.visible = true

	GameManager::moveBackground = (position) ->
		@background.y = position * 0.1
		@background.y %= GAME.background.height * 2
		@background.y -= GAME.background.height*2 if (GAME.background.y>$(window).height())

		@background2.y = position * 0.1 - GAME.background2.height
		@background2.y %= GAME.background2.height * 2
		@background2.y -= GAME.background2.height*2 if (GAME.background2.y>$(window).height())
	return GameManager