(function() {
  "use strict";
  var $, GameManager, PIXI, gameManager, level1, mainMenu, pause, splashScreen;

  PIXI = require("./vendor/pixi/bin/pixi.dev.js");

  $ = require("./vendor/jquery/dist/jquery.js");

  GameManager = require("./GameManager.js");

  splashScreen = require("./scenes/SplashScreen.js");

  mainMenu = require("./scenes/MainMenu.js");

  level1 = require("./scenes/Level1.js");

  pause = require("./scenes/Pause.js");

  window.PIXI = PIXI;

  window.$ = $;

  gameManager = new GameManager();

  gameManager.create($(window).width(), $(window).height());

  window.GAME = gameManager;

  mainMenu = gameManager.createScene("mainMenu", mainMenu);

  level1 = gameManager.createScene("level1", level1);

  pause = gameManager.createScene("pause", pause);

  gameManager.goToScene("level1");

}).call(this);
