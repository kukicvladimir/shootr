"use strict"

define [
	"PIXI"
	"Util"
	"EventDispatcher"
	"Geometry"
	"Metheor"
],
(PIXI, Util, EventDispatcher, Geometry, Metheor) ->

	class GameLoop extends EventDispatcher

	GameLoop::start = ->
		return if @renderer?
		@renderer = new PIXI.autoDetectRenderer($(window).width(), $(window).height())
		@renderer.view.style.display = "block"
		@renderer.view.style.width = "100%"
		@renderer.view.style.height = "100%"

		#add render view to DOM
		document.body.appendChild(@renderer.view)
		@trigger "READY"
		return @

	window.GameLoop = new GameLoop
	window.PIXI = PIXI
		

	GameLoop::startRendering = (stage) ->		
		@renderer.view.style.display = "block"
		position = 0
		render = =>
			isGameOverDisplayed = false
			LAST_FRAME_ID = requestAnimFrame(render)
			position += 10
			GAME.moveBackground(position)

			if GAME.isWaveComplete()
				GAME.createWave()
			

			GAME.player.moveRight() if GAME.rightButton
			GAME.player.moveLeft() if GAME.leftButton
			GAME.player.moveUp() if GAME.upButton
			GAME.player.moveDown() if GAME.downButton
			GAME.player.shoot() if GAME.shootButton

			if position%1000 is 0
				metheor = new Metheor()
				GAME.stage.addChildAt(metheor.sprite, 4)
				GAME.metheors.push metheor

			# gameWon = true
			for metheor in GAME.metheors 
				metheor.move()

			for npc in GAME.npcs
				gameWon = false if not npc.isDead()
				npc.move()
				if npc?.bullets
					for bullet in npc?.bullets
						bullet?.move()
						continue if not GAME.player.isCollidable
						continue if GAME.player.isDead()
						if bullet and Geometry.rectangleIntersectsRectangle(bullet.sprite.getBounds(), GAME.player.sprite.getBounds())
							GAME.player.decreaseHealth(bullet.damage)
							GAME.Hud.updateHealthBarAndLifes(GAME.player.health, GAME.player.baseHealth, GAME.player.lifes)
							npc.removeBullet(bullet.uid)

			for bullet in GAME.player.bullets
				if GAME.npcs
					for npc in GAME.npcs
						continue if npc.isDead()
						if bullet and Geometry.rectangleIntersectsRectangle(bullet.sprite.getBounds(), npc.sprite.getBounds())
							npc.decreaseHealth(bullet.damage)
							GAME.Hud.updateScore(50)
							GAME.player.removeBullet(bullet.uid)

				for metheor in GAME.metheors
					continue if metheor.isDead()
					continue if not metheor.isCollidable
					#check if player is hit by metheor
					if Geometry.rectangleIntersectsRectangle(metheor.sprite.getBounds(), GAME.player.sprite.getBounds())
						GAME.player.decreaseHealth(metheor.damage)

					if bullet and Geometry.rectangleIntersectsRectangle(bullet.sprite.getBounds(), metheor.sprite.getBounds())
						metheor.decreaseHealth(bullet.damage)
						GAME.Hud.updateScore(50)
						GAME.player.removeBullet(bullet.uid)
				bullet?.move()

			# if GAME.player.isDead() and not isGameOverDisplayed
			# 	GAME.gameOver()
			# 	isGameOverDisplayed = true
			# else if gameWon 
			# 	alert "congratulations! you win"
			
			@renderer.render(stage)
		render()
		return @

	return (window.GameLoop)