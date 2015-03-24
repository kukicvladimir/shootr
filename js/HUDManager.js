(function() {
  "use strict";
  var HUDManager;

  HUDManager = (function() {
    function HUDManager(scene) {
      this.score = 0;
      this.scoreText = new PIXI.Text("0", {
        font: "bold italic 40px Pixelate",
        fill: "#5ACAFA",
        align: "center",
        stroke: "#ffffff",
        strokeThickness: 7
      });
      this.healthBar = new PIXI.Graphics();
      this.lifesText = new PIXI.Text("a", {
        font: "60px Pixelate",
        fill: "#FF0000",
        align: "center"
      });
      this.init(scene);
      return this;
    }

    return HUDManager;

  })();

  HUDManager.prototype.init = function(scene) {
    scene.addChild(this.scoreText);
    this.updateHealthBarAndLifes(scene.player.health, scene.player.baseHealth, scene.player.lifes);
    scene.addChild(this.healthBar);
    return scene.addChild(this.lifesText);
  };

  HUDManager.prototype.updateScore = function(score) {
    this.score += score;
    return this.scoreText.setText(this.score);
  };

  HUDManager.prototype.updateHealthBarAndLifes = function(health, baseHealth, lifes) {
    var i, life, ref, text;
    this.healthBar.clear();
    this.healthBar.lineStyle(4, 0xe0e0e0, 1);
    this.healthBar.beginFill(0x000000, 1);
    this.healthBar.drawRect($(window).width() - 430, 5, 400, 30);
    this.healthBar.lineStyle(0);
    if (health >= baseHealth * 0.5) {
      this.healthBar.beginFill(0x92F72D, 1);
    }
    if (health < baseHealth * 0.5 && health >= baseHealth * 0.25) {
      this.healthBar.beginFill(0xFFF70D, 1);
    }
    if (health < baseHealth * 0.25) {
      this.healthBar.beginFill(0xFF0000, 1);
    }
    this.healthBar.drawRect($(window).width() - 430, 7, health * 400 / baseHealth, 27);
    text = "";
    for (life = i = 0, ref = lifes; 0 <= ref ? i < ref : i > ref; life = 0 <= ref ? ++i : --i) {
      text += "a";
    }
    this.lifesText.position.x = $(window).width() - 200;
    this.lifesText.position.y = 40;
    return this.lifesText.setText(text);
  };

  module.exports = HUDManager;

}).call(this);
