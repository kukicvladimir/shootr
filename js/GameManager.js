(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["EventDispatcher", "HUDManager", "AssetsLoader", "Player", "NPC", "RetardedNPC"], function(EventDispatcher, HUDManager, AssetsLoader, Player, NPC, RetardedNPC) {
    var GameManager;
    GameManager = (function(_super) {
      __extends(GameManager, _super);

      function GameManager() {
        GameManager.__super__.constructor.apply(this, arguments);
        this.speed = 1;
        this.rightButton = false;
        this.leftButton = false;
        this.upButton = false;
        this.downButton = false;
        this.shootButton = false;
        this.init();
      }

      return GameManager;

    })(EventDispatcher);
    GameManager.prototype.init = function() {
      this.assets = new AssetsLoader();
      this.metheors = [];
    };
    GameManager.prototype.start = function() {
      return this.startGame();
    };
    GameManager.prototype.createWave = function() {
      var i, npc, retardedNPC, _i, _j, _ref, _ref1, _results;
      this.npcs = [];
      for (i = _i = 0, _ref = ~~(Math.random() * 30); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        npc = new NPC();
        this.stage.addChild(npc.sprite);
        this.npcs.push(npc);
      }
      _results = [];
      for (i = _j = 0, _ref1 = ~~(Math.random() * 5); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        retardedNPC = new RetardedNPC();
        this.stage.addChild(retardedNPC.sprite);
        _results.push(this.npcs.push(retardedNPC));
      }
      return _results;
    };
    GameManager.prototype.isWaveComplete = function() {
      var npc, out, _i, _len, _ref;
      if (this.npcs) {
        _ref = this.npcs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          npc = _ref[_i];
          if (npc.health > 0) {
            return out = false;
          }
        }
      }
      return true;
    };
    GameManager.prototype.startGame = function() {
      this.assets.showSpinner();
      this.assets.load();
      this.stage = new PIXI.Stage(0xFFFFFF);
      this.gameover = PIXI.Sprite.fromImage("resources/img/gameover.png");
      this.background = PIXI.Sprite.fromImage("resources/img/sky1.png");
      this.background2 = PIXI.Sprite.fromImage("resources/img/sky2.png");
      this.background.position.x = 0;
      this.background.position.y = 0;
      this.gameover.visible = false;
      this.stage.addChild(this.background);
      this.stage.addChild(this.background2);
      this.player = new Player();
      this.stage.addChild(this.player.sprite);
      this.stage.addChild(this.gameover);
      this.Hud = new HUDManager();
      GameLoop.startRendering(this.stage);
      return this.assets.hideSpinner();
    };
    GameManager.prototype.gameOver = function() {
      GAME.player.setCollidable(false);
      return this.gameover.visible = true;
    };
    GameManager.prototype.moveBackground = function(position) {
      this.background.y = position * 0.1;
      this.background.y %= GAME.background.height * 2;
      if (GAME.background.y > $(window).height()) {
        this.background.y -= GAME.background.height * 2;
      }
      this.background2.y = position * 0.1 - GAME.background2.height;
      this.background2.y %= GAME.background2.height * 2;
      if (GAME.background2.y > $(window).height()) {
        return this.background2.y -= GAME.background2.height * 2;
      }
    };
    return GameManager;
  });

}).call(this);
