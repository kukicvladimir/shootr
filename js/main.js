(function() {
  "use strict";
  var $, GameManager, PIXI, gameManager, level1, mainMenu, splashScreen;

  PIXI = require("./vendor/pixi/bin/pixi.dev.js");

  $ = require("./vendor/jquery/dist/jquery.js");

  GameManager = require("./GameManager.js");

  splashScreen = require("./scenes/SplashScreen.js");

  mainMenu = require("./scenes/MainMenu.js");

  level1 = require("./scenes/Level1.js");

  window.PIXI = PIXI;

  window.$ = $;

  gameManager = new GameManager();

  gameManager.create($(window).width(), $(window).height());

  window.GAME = gameManager;

  splashScreen = gameManager.createScene("splashScreen", splashScreen);

  mainMenu = gameManager.createScene("mainMenu", mainMenu);

  level1 = gameManager.createScene("level1", level1);

  gameManager.goToScene("splashScreen");

}).call(this);
