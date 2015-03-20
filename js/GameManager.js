(function() {
  "use strict";
  var GameManager, InputManager, Scene;

  Scene = require("./Scene");

  InputManager = require("./InputManager");

  GameManager = (function() {
    function GameManager() {
      this.speed = 1;
      this.renderer = PIXI.IRenderer;
      this.currentScene = null;
      this.scenes = {};
      this.speed = 1;
      this.rightButton = false;
      this.leftButton = false;
      this.upButton = false;
      this.downButton = false;
      this.shootButton = false;
      this.inputManager = new InputManager();
      return this;
    }

    return GameManager;

  })();


  /*
  Create scene
   */

  GameManager.prototype.createScene = function(id, TScene) {
    var scene;
    if (this.scenes[id]) {
      return void 0;
    }
    scene = new TScene();
    this.scenes[id] = scene;
    return scene;
  };

  GameManager.prototype.goToScene = function(id) {
    if (this.scenes[id]) {
      if (this.currentScene) {
        this.currentScene.pause();
      }
      this.currentScene = this.scenes[id];
      this.currentScene.resume();
      return true;
    } else {
      return false;
    }
  };

  GameManager.prototype.create = function(width, height) {
    if (this.renderer) {
      return this;
    }
    this.renderer = PIXI.autoDetectRenderer(width, height);
    this.renderer.view.style.display = "block";
    this.renderer.view.style.width = width;
    this.renderer.view.style.height = height;
    this.defaultWidth = width;
    this.defaultHeight = height;
    document.body.appendChild(this.renderer.view);
    window.addEventListener('resize', function() {
      GAME.renderer.resize(window.innerWidth, window.innerHeight);
      GAME.renderer.view.style.width = window.innerWidth + 'px';
      return GAME.renderer.view.style.height = window.innerHeight + 'px';
    }, true);
    requestAnimationFrame(this.loop);
    return this;
  };

  GameManager.prototype.loop = (function(_this) {
    return function() {
      var render;
      render = function() {
        var i, len, object, ref;
        GAME.stats.begin();
        requestAnimationFrame(render);
        if (!GAME.currentScene || GAME.currentScene.isPaused()) {
          return;
        }
        ref = GAME.currentScene.children;
        for (i = 0, len = ref.length; i < len; i++) {
          object = ref[i];
          if (object != null) {
            if (typeof object.update === "function") {
              object.update();
            }
          }
        }
        GAME.currentScene.update();
        GAME.renderer.render(GAME.currentScene);
        return GAME.stats.end();
      };
      return render();
    };
  })(this);

  module.exports = GameManager;

}).call(this);
