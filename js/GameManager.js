(function() {
  "use strict";
  var GameManager, Scene;

  Scene = require("./Scene");

  GameManager = (function() {
    function GameManager() {
      this.renderer = PIXI.IRenderer;
      this.currentScene = null;
      this.scenes = {};
      this.speed = 1;
      this.rightButton = false;
      this.leftButton = false;
      this.upButton = false;
      this.downButton = false;
      this.shootButton = false;
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
    requestAnimationFrame(this.loop);
    return this;
  };

  GameManager.prototype.loop = (function(_this) {
    return function() {
      var render;
      render = function() {
        requestAnimationFrame(render);
        if (!GAME.currentScene || GAME.currentScene.isPaused()) {
          return;
        }
        GAME.currentScene.update();
        return GAME.renderer.render(GAME.currentScene);
      };
      return render();
    };
  })(this);

  module.exports = GameManager;

}).call(this);
