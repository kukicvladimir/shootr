(function() {
  "use strict";
  require.config({
    baseUrl: "js",
    paths: {
      "jquery": "vendor/jquery/dist/jquery.min",
      "jquery-ui": "vendor/jquery-ui/jquery-ui.min",
      "PIXI": "vendor/pixi/bin/pixi",
      "handlebars": "vendor/handlebars/handlebars.min",
      "async": "vendor/async/lib/async"
    },
    shim: {
      "jquery": {
        exports: "$"
      },
      "jquery-ui": {
        deps: ["jquery"],
        exports: "$"
      },
      "PIXI": {
        exports: "PIXI"
      },
      "handlebars": {
        exports: "Handlebars"
      },
      "async": {
        exports: "async"
      }
    }
  });

  require(["GameLoop", "GameManager", "handlebars", "async"], function(GameLoop, GameManager, Handlebars, async) {
    var onKeyDown, onKeyUp;
    window.Handlebars = Handlebars;
    window.async = async;
    GameLoop.on("READY", (function(_this) {
      return function() {
        var GAME;
        GAME = new GameManager();
        window.GAME = GAME;
        return GAME.start();
      };
    })(this));
    GameLoop.start();
    onKeyDown = function(evt) {
      switch (evt.keyCode) {
        case 39:
          return GAME.rightButton = true;
        case 37:
          return GAME.leftButton = true;
        case 38:
          return GAME.upButton = true;
        case 40:
          return GAME.downButton = true;
        case 32:
          return GAME.shootButton = true;
      }
    };
    onKeyUp = function(evt) {
      switch (evt.keyCode) {
        case 39:
          return GAME.rightButton = false;
        case 37:
          return GAME.leftButton = false;
        case 38:
          return GAME.upButton = false;
        case 40:
          return GAME.downButton = false;
        case 32:
          return GAME.shootButton = false;
      }
    };
    $(document).keydown(onKeyDown);
    return $(document).keyup(onKeyUp);
  });

}).call(this);
