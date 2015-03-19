(function() {
  "use strict";
  var PIXI, Scene,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  PIXI = require("../js/vendor/pixi/bin/pixi.dev.js");

  Scene = (function(superClass) {
    extend(Scene, superClass);

    function Scene(background) {
      Scene.__super__.constructor.call(this, background);
      this.paused = false;
      return this;
    }

    Scene.prototype.onUpdate = function(updateCB) {
      return this.updateCB = updateCB;
    };

    Scene.prototype.update = function() {
      return this.updateCB();
    };

    Scene.prototype.pause = function() {
      return this.paused = true;
    };

    Scene.prototype.resume = function() {
      return this.paused = false;
    };

    Scene.prototype.isPaused = function() {
      return this.paused;
    };

    return Scene;

  })(PIXI.Stage);

  module.exports = Scene;

}).call(this);
