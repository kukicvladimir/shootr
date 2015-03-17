(function() {
  var Level1, Player, Scene,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Scene = require("../Scene");

  Player = require("../Player");

  Level1 = (function(superClass) {
    extend(Level1, superClass);

    function Level1() {
      var onKeyDown, onKeyUp;
      Level1.__super__.constructor.call(this);
      this.background = PIXI.Sprite.fromImage("resources/img/sky1.png");
      this.background2 = PIXI.Sprite.fromImage("resources/img/sky2.png");
      this.background.position.x = 0;
      this.background.position.y = 0;
      this.addChild(this.background);
      this.addChild(this.background2);
      this.player = new Player();
      this.addChild(this.player.sprite);
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
          case 80:
            return GAME.paused = true;
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
          case 80:
            return GAME.paused = true;
        }
      };
      $(document).keydown(onKeyDown);
      $(document).keyup(onKeyUp);
    }

    return Level1;

  })(Scene);

  Level1.prototype.update = (function() {
    var bullet, i, len, ref, results;
    this.background.y += 0.1;
    this.background.y %= this.background.height * 2;
    if (this.background.y > $(window).height()) {
      this.background.y += this.background.height * 2;
    }
    this.background2.y += 0.1 - this.background2.height;
    this.background2.y %= this.background2.height * 2;
    if (this.background2.y > $(window).height()) {
      this.background2.y += this.background2.height * 2;
    }
    if (GAME.rightButton) {
      this.player.moveRight();
    }
    if (GAME.leftButton) {
      this.player.moveLeft();
    }
    if (GAME.upButton) {
      this.player.moveUp();
    }
    if (GAME.downButton) {
      this.player.moveDown();
    }
    if (GAME.shootButton) {
      this.player.shoot();
    }
    if (GAME.paused) {
      GAME.goToScene("pause");
    }
    ref = this.player.bullets;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      bullet = ref[i];
      results.push(bullet != null ? bullet.move() : void 0);
    }
    return results;
  });

  module.exports = Level1;

}).call(this);
