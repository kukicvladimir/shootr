(function() {
  var HUDManager, Level1, Metheor, NPC, Player, Satellite, Scene, YellowQueen, levelScript,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Scene = require("../Scene");

  Player = require("../Player");

  NPC = require("../NPC");

  Satellite = require("../Satellite");

  YellowQueen = require("../YellowQueen");

  Metheor = require("../Metheor");

  HUDManager = require("../HUDManager");

  levelScript = require("../../resources/json/level.json");

  Level1 = (function(superClass) {
    extend(Level1, superClass);

    function Level1() {
      Level1.__super__.constructor.call(this);
      this.init();
    }

    return Level1;

  })(Scene);

  Level1.prototype.init = function() {
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
    return GAME.hud = new HUDManager(this);
  };

  Level1.prototype.reset = function() {
    this.count = 0;
    this.removeChildren();
    return this.init();
  };

  Level1.prototype.update = function() {
    var i, j, key, metheor, npc, opts, position, props, ref, ref1;
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
    if (this.count > 240000) {
      this.count = 0;
    }
    if (this.count % 1000. === 0) {
      metheor = new Metheor();
      this.addChild(metheor, 2);
    }
    if (!!levelScript[this.count]) {
      ref = levelScript[this.count];
      for (key in ref) {
        props = ref[key];
        for (i = j = 0, ref1 = props.count; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
          position = new PIXI.Point(props.position.x - i * 100, props.position.y);
          opts = {
            position: position,
            velocity: new PIXI.Point(props.velocity.x, props.velocity.y)
          };
          switch (key) {
            case "NPC":
              npc = new NPC(opts);
              break;
            case "Satellite":
              npc = new Satellite(opts);
              break;
            case "YellowQueen":
              npc = new YellowQueen(opts);
          }
          this.addChild(npc);
        }
      }
    }
    if (GAME.inputManager.keyDown(GAME.inputManager.Keys.P)) {
      return GAME.goToScene("pause");
    }
  };

  module.exports = Level1;

}).call(this);
