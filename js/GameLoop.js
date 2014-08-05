(function() {
  "use strict";
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["PIXI", "Util", "EventDispatcher", "Geometry", "Metheor"], function(PIXI, Util, EventDispatcher, Geometry, Metheor) {
    var GameLoop;
    GameLoop = (function(_super) {
      __extends(GameLoop, _super);

      function GameLoop() {
        return GameLoop.__super__.constructor.apply(this, arguments);
      }

      return GameLoop;

    })(EventDispatcher);
    GameLoop.prototype.start = function() {
      if (this.renderer != null) {
        return;
      }
      this.renderer = new PIXI.autoDetectRenderer($(window).width(), $(window).height());
      this.renderer.view.style.display = "block";
      this.renderer.view.style.width = "100%";
      this.renderer.view.style.height = "100%";
      document.body.appendChild(this.renderer.view);
      this.trigger("READY");
      return this;
    };
    window.GameLoop = new GameLoop;
    window.PIXI = PIXI;
    GameLoop.prototype.startRendering = function(stage) {
      var position, render;
      this.renderer.view.style.display = "block";
      position = 0;
      render = (function(_this) {
        return function() {
          var LAST_FRAME_ID, bullet, gameWon, isGameOverDisplayed, metheor, npc, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
          isGameOverDisplayed = false;
          LAST_FRAME_ID = requestAnimFrame(render);
          position += 10;
          GAME.moveBackground(position);
          if (GAME.isWaveComplete()) {
            GAME.createWave();
          }
          if (GAME.rightButton) {
            GAME.player.moveRight();
          }
          if (GAME.leftButton) {
            GAME.player.moveLeft();
          }
          if (GAME.upButton) {
            GAME.player.moveUp();
          }
          if (GAME.downButton) {
            GAME.player.moveDown();
          }
          if (GAME.shootButton) {
            GAME.player.shoot();
          }
          if (position % 1000 === 0) {
            metheor = new Metheor();
            GAME.stage.addChildAt(metheor.sprite, 4);
            GAME.metheors.push(metheor);
          }
          _ref = GAME.metheors;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            metheor = _ref[_i];
            metheor.move();
          }
          _ref1 = GAME.npcs;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            npc = _ref1[_j];
            if (!npc.isDead()) {
              gameWon = false;
            }
            npc.move();
            if (npc != null ? npc.bullets : void 0) {
              _ref2 = npc != null ? npc.bullets : void 0;
              for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                bullet = _ref2[_k];
                if (bullet != null) {
                  bullet.move();
                }
                if (!GAME.player.isCollidable) {
                  continue;
                }
                if (GAME.player.isDead()) {
                  continue;
                }
                if (bullet && Geometry.rectangleIntersectsRectangle(bullet.sprite.getBounds(), GAME.player.sprite.getBounds())) {
                  GAME.player.decreaseHealth(bullet.damage);
                  GAME.Hud.updateHealthBarAndLifes(GAME.player.health, GAME.player.baseHealth, GAME.player.lifes);
                  npc.removeBullet(bullet.uid);
                }
              }
            }
          }
          _ref3 = GAME.player.bullets;
          for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
            bullet = _ref3[_l];
            if (GAME.npcs) {
              _ref4 = GAME.npcs;
              for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
                npc = _ref4[_m];
                if (npc.isDead()) {
                  continue;
                }
                if (bullet && Geometry.rectangleIntersectsRectangle(bullet.sprite.getBounds(), npc.sprite.getBounds())) {
                  npc.decreaseHealth(bullet.damage);
                  GAME.Hud.updateScore(50);
                  GAME.player.removeBullet(bullet.uid);
                }
              }
            }
            _ref5 = GAME.metheors;
            for (_n = 0, _len5 = _ref5.length; _n < _len5; _n++) {
              metheor = _ref5[_n];
              if (metheor.isDead()) {
                continue;
              }
              if (!metheor.isCollidable) {
                continue;
              }
              if (Geometry.rectangleIntersectsRectangle(metheor.sprite.getBounds(), GAME.player.sprite.getBounds())) {
                GAME.player.decreaseHealth(metheor.damage);
              }
              if (bullet && Geometry.rectangleIntersectsRectangle(bullet.sprite.getBounds(), metheor.sprite.getBounds())) {
                metheor.decreaseHealth(bullet.damage);
                GAME.Hud.updateScore(50);
                GAME.player.removeBullet(bullet.uid);
              }
            }
            if (bullet != null) {
              bullet.move();
            }
          }
          return _this.renderer.render(stage);
        };
      })(this);
      render();
      return this;
    };
    return window.GameLoop;
  });

}).call(this);
