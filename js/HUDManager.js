(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "jquery-ui", "EventDispatcher"], function($, $$, EventDispatcher) {
    var HUDManager;
    HUDManager = (function(_super) {
      __extends(HUDManager, _super);

      function HUDManager() {
        this.score = 0;
        this.scoreText = new PIXI.Text("0", {
          font: "bold italic 60px Arvo",
          fill: "#000000",
          align: "center",
          stroke: "#ffffff",
          strokeThickness: 7
        });
        this.healthBar = new PIXI.Graphics();
        this.lifesText = new PIXI.Text("♥", {
          font: "bold italic 60px Arvo",
          fill: "#FF0000",
          align: "center"
        });
        this.init();
        HUDManager.__super__.constructor.apply(this, arguments);
      }

      return HUDManager;

    })(EventDispatcher);
    HUDManager.prototype.init = function() {
      var player;
      player = GAME.player;
      GAME.stage.addChild(this.scoreText);
      this.updateHealthBarAndLifes(player.health, player.baseHealth, player.lifes);
      GAME.stage.addChild(this.healthBar);
      return GAME.stage.addChild(this.lifesText);
    };
    HUDManager.prototype.updateScore = function(score) {
      this.score += score;
      return this.scoreText.setText(this.score);
    };
    HUDManager.prototype.updateHealthBarAndLifes = function(health, baseHealth, lifes) {
      var life, text, _i;
      this.healthBar.clear();
      this.healthBar.lineStyle(4, 0xe0e0e0, 1);
      this.healthBar.drawRect($(window).width() - 430, 5, 400, 30);
      this.healthBar.lineStyle(0);
      if (health >= baseHealth * 0.5) {
        this.healthBar.beginFill(0x92F72D, 1);
      }
      if (health < baseHealth * 0.5) {
        this.healthBar.beginFill(0xFFF70D, 1);
      }
      if (health < baseHealth * 0.25) {
        this.healthBar.beginFill(0xFF0000, 1);
      }
      this.healthBar.drawRect($(window).width() - 430, 6, health * 400 / baseHealth, 29);
      text = "";
      for (life = _i = 0; 0 <= lifes ? _i < lifes : _i > lifes; life = 0 <= lifes ? ++_i : --_i) {
        text += "♥";
      }
      this.lifesText.position.x = $(window).width() - 150;
      this.lifesText.position.y = 50;
      return this.lifesText.setText(text);
    };
    return HUDManager;
  });

}).call(this);
