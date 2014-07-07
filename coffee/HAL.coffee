"use strict"

define [
	"PIXI"
	"Util"
	"EventDispatcher"
	"Geometry"
	"Metheor"
],
(PIXI, Util, EventDispatcher, Geometry, Metheor) ->

	class HAL extends EventDispatcher

	HAL::start = ->
		return if @renderer?
		@renderer = new PIXI.autoDetectRenderer($(window).width(), $(window).height())
		@renderer.view.style.display = "block"
		@renderer.view.style.width = "100%"
		@renderer.view.style.height = "100%"

		#add render view to DOM
		document.body.appendChild(@renderer.view)
		@trigger "READY"
		return @

	window.HAL = new HAL
	window.PIXI = PIXI
		

	HAL::startRendering = (stage) ->		
		@renderer.view.style.display = "block"
		position = 0
		render = =>
			LAST_FRAME_ID = requestAnimFrame(render)
			position += 10
			GAME.moveBackground(position)

			GAME.player.moveRight() if GAME.rightButton
			GAME.player.moveLeft() if GAME.leftButton
			GAME.player.moveUp() if GAME.upButton
			GAME.player.moveDown() if GAME.downButton
			GAME.player.shoot() if GAME.shootButton

			if position%1000 is 0
				metheor = new Metheor()
				GAME.stage.addChildAt(metheor.sprite, 4)
				GAME.metheors.push metheor

			gameWon = true
			for metheor in GAME.metheors 
				metheor.move()

			for npc in GAME.npcs
				gameWon = false if not npc.isDead()
				npc.move()
				if npc?.bullets
					for bullet in npc?.bullets
						if bullet and Geometry.rectangleIntersectsRectangle(bullet.sprite.getBounds(), GAME.player.sprite.getBounds())
							GAME.player.decreaseHealth(bullet.damage)
							GAME.Hud.updateHealthBarAndLifes(GAME.player.health, GAME.player.baseHealth, GAME.player.lifes)
							npc.removeBullet(bullet.uid)
						bullet?.move()

			for bullet in GAME.player.bullets
				for npc in GAME.npcs
					continue if npc.isDead()
					if bullet and Geometry.rectangleIntersectsRectangle(bullet.sprite.getBounds(), npc.sprite.getBounds())
						npc.decreaseHealth(bullet.damage)
						GAME.Hud.updateScore(50)
						GAME.player.removeBullet(bullet.uid)

				for metheor in GAME.metheors
					continue if metheor.isDead()
					continue if not metheor.isCollidable
					if bullet and Geometry.rectangleIntersectsRectangle(bullet.sprite.getBounds(), metheor.sprite.getBounds())
						metheor.decreaseHealth(bullet.damage)
						GAME.Hud.updateScore(50)
						GAME.player.removeBullet(bullet.uid)
				bullet?.move()

			if GAME.player.isDead()
				console.log "game over"
			else if gameWon 
				alert "congratulations! you win"
			else
				@renderer.render(stage)
		render()
		return @

	return (window.HAL)