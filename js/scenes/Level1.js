(function() {
  var Level1, NPC, Player, Scene, Vector2,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Scene = require("../Scene");

  Player = require("../Player");

  NPC = require("../NPC");

  Vector2 = require("../Vector2");

  Level1 = (function(superClass) {
    extend(Level1, superClass);

    function Level1() {
      Level1.__super__.constructor.call(this);
      this.background = PIXI.Sprite.fromImage("resources/img/sky1.png");
      this.background.tint = 0x0000FF;
      this.background._uid = 999;
      this.background2 = PIXI.Sprite.fromImage("resources/img/sky2.png");
      this.background2.tint = 0x0000FF;
      this.background._uid = 1000;
      this.background.position.x = 0;
      this.background.position.y = 0;
      this.count = 0;
      this.addChild(this.background);
      this.addChild(this.background2);
      this.player = new Player();
      this.addChild(this.player);
    }

    return Level1;

  })(Scene);

  Level1.prototype.update = function() {
    var i, j, npc, opts, position;
    this.count += GAME.speed * 10;
    this.background.y = this.count * 0.1;
    this.background.y %= this.background.height * 2;
    if (this.background.y > $(window).height()) {
      this.background.y -= this.background.height * 2;
    }
    this.background2.y = this.count * 0.1 - this.background2.height;
    this.background2.y %= this.background2.height * 2;
    if (this.background2.y > $(window).height()) {
      this.background2.y -= this.background2.height * 2;
    }
    if (this.count % 5000 === 0) {
      for (i = j = 0; j <= 5; i = ++j) {
        position = new Vector2(-i * 100, 300);
        opts = {
          position: position,
          velocity: new Vector2(1, 0)
        };
        npc = new NPC(opts);
        this.addChild(npc);
      }
    }
    if (GAME.inputManager.keyDown(GAME.inputManager.Keys.P)) {
      return GAME.goToScene("pause");
    }
  };

  module.exports = Level1;

}).call(this);
