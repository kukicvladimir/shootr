"use strict"

require.config
	baseUrl: "js"
	paths:
		"jquery": "vendor/jquery/dist/jquery.min"
		"jquery-ui": "vendor/jquery-ui/jquery-ui.min"
		"PIXI": "vendor/pixi/bin/pixi"
		"handlebars": "vendor/handlebars/handlebars.min"
		"async": "vendor/async/lib/async"
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

		"async":
			exports: "async"

require [
	"GameLoop"
	"GameManager"
	"handlebars"
	"async"
],
(
	GameLoop
	GameManager
	Handlebars
	async
) ->
	
	window.Handlebars = Handlebars
	window.async = async

	GameLoop.on "READY", =>
		GAME = new GameManager()
		window.GAME = GAME
		GAME.start()
	GameLoop.start() 

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