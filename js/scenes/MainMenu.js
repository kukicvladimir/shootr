(function() {
  var MainMenu, Scene,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Scene = require("../Scene");

  MainMenu = (function(superClass) {
    extend(MainMenu, superClass);

    function MainMenu() {
      var onKeyDown, onKeyUp;
      MainMenu.__super__.constructor.call(this);
      this.title = new PIXI.Text("ShootR", {
        font: "150px Arial",
        fill: "#5ACAFA",
        align: "center",
        stroke: "#FFFFFF",
        strokeThickness: 6
      });
      this.title.position.x = $(window).width() / 2 - this.title.width / 2;
      this.title.position.y = $(window).height() / 2 - this.title.height / 2;
      this.anyKey = new PIXI.Text("PRESS ANY KEY TO START", {
        font: "18px Snippet",
        fill: "white",
        align: "left"
      });
      this.anyKey.position.x = $(window).width() / 2 - this.anyKey.width / 2;
      this.anyKey.position.y = $(window).height() / 2 + this.title.height / 2;
      this.background = PIXI.Sprite.fromImage("resources/img/sky1.png");
      this.background2 = PIXI.Sprite.fromImage("resources/img/sky2.png");
      this.background.position.x = 0;
      this.background.position.y = 0;
      this.addChild(this.background);
      this.addChild(this.background2);
      this.addChild(this.title);
      this.addChild(this.anyKey);
      onKeyDown = function(evt) {
        if (evt.keyCode !== void 0) {
          return GAME.goToScene("level1");
        }
      };
      onKeyUp = function(evt) {};
      $(document).keydown(onKeyDown);
      $(document).keyup(onKeyUp);
    }

    return MainMenu;

  })(Scene);

  MainMenu.prototype.update = function() {
    this.background.y -= 0.1;
    this.background.y %= this.background.height * 2;
    if (this.background.y > $(window).height()) {
      this.background.y -= this.background.height * 2;
    }
    this.background2.y -= 0.1 - this.background2.height;
    this.background2.y %= this.background2.height * 2;
    if (this.background2.y > $(window).height()) {
      return this.background2.y -= this.background2.height * 2;
    }
  };

  module.exports = MainMenu;

}).call(this);
