"use strict"

PIXI = require("./vendor/pixi/bin/pixi.dev.js")
$ = require("./vendor/jquery/dist/jquery.js")
#Stats = require("./vendor/stats.js/build/stats.min.js")


GameManager = require("./GameManager.js")
splashScreen = require("./scenes/SplashScreen.js")
mainMenu = require("./scenes/MainMenu.js")
level1 = require("./scenes/Level1.js")
pause = require("./scenes/Pause.js")
gameOver = require("./scenes/GameOver.js")

window.PIXI = PIXI
window.$ = $

gameManager = new GameManager()
gameManager.create($(window).width(), $(window).height())
window.GAME = gameManager

splashScreen = gameManager.createScene("splashScreen", splashScreen)
mainMenu = gameManager.createScene("mainMenu", mainMenu)
level1 = gameManager.createScene("level1", level1)
pause = gameManager.createScene("pause", pause)
gameOver = gameManager.createScene("gameOver", gameOver)

gameManager.goToScene("splashScreen")


#GAME.stats = new Stats()
#GAME.stats.setMode(1)
#GAME.stats.domElement.style.zIndex = 999;
#GAME.stats.domElement.style.position = 'absolute'
#GAME.stats.domElement.style.left = '0px'
#GAME.stats.domElement.style.top = '0px'
#
#document.body.appendChild( GAME.stats.domElement );