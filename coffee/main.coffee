"use strict"

require.config
	baseUrl: "js"
	paths:
		"jquery": "vendor/jquery/dist/jquery.min"
		"jquery-ui": "vendor/jquery-ui/ui/minified/jquery-ui.min"
		"PIXI": "vendor/pixi/bin/pixi"
		"handlebars": "vendor/handlebars/handlebars.min"
	shim:
		"jquery":
			exports: "$"

		"jquery-ui":
			deps: ["jquery"]
			exports: "$"

		"PIXI":
			exports: "PIXI"

		"handlebars":
			exports: "Handlebars"

require [
	"HAL"
	"GameManager"
	"handlebars"
],
(
	HAL
	GameManager
	Handlebars
) ->
	
	window.Handlebars = Handlebars

	HAL.on "READY", =>
		GAME = new GameManager()
		window.GAME = GAME
		GAME.start()
	HAL.start() 

	onKeyDown = (evt) ->
		switch evt.keyCode
			when 39 then GAME.rightButton = true
			when 37 then GAME.leftButton = true
			when 38 then GAME.upButton = true
			when 40 then GAME.downButton = true
			when 32 then GAME.shootButton = true

	onKeyUp = (evt) ->
		switch evt.keyCode
			when 39 then GAME.rightButton = false
			when 37 then GAME.leftButton = false
			when 38 then GAME.upButton = false
			when 40 then GAME.downButton = false
			when 32 then GAME.shootButton = false
	
	$(document).keydown(onKeyDown)
	$(document).keyup(onKeyUp)