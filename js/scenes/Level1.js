(function() {
  var Level1, Player, Scene,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Scene = require("../Scene");

  Player = require("../Player");

  Level1 = (function(superClass) {
    extend(Level1, superClass);

    function Level1() {
      Level1.__super__.constructor.call(this);
      this.background = PIXI.Sprite.fromImage("resources/img/sky1.png");
      this.background.tint = 0x0000FF;
      this.background2 = PIXI.Sprite.fromImage("resources/img/sky2.png");
      this.background2.tint = 0x0000FF;
      this.background.position.x = 0;
      this.background.position.y = 0;
      this.position = 0;
      this.addChild(this.background);
      this.addChild(this.background2);
      this.player = new Player();
      this.addChild(this.player.sprite);
    }

    return Level1;

  })(Scene);

  Level1.prototype.update = (function() {
    var bullet, i, len, ref, results;
    this.position += GAME.speed * 10;
    if (GAME.inputManager.keyDown(GAME.inputManager.Keys.LEFT)) {
      this.player.moveLeft();
    }
    if (GAME.inputManager.keyDown(GAME.inputManager.Keys.RIGHT)) {
      this.player.moveRight();
    }
    if (GAME.inputManager.keyDown(GAME.inputManager.Keys.UP)) {
      this.player.moveUp();
    }
    if (GAME.inputManager.keyDown(GAME.inputManager.Keys.DOWN)) {
      this.player.moveDown();
    }
    if (GAME.inputManager.keyDown(GAME.inputManager.Keys.SPACE)) {
      this.player.shoot();
    }
    if (GAME.inputManager.keyDown(GAME.inputManager.Keys.P)) {
      GAME.goToScene("pause");
    }
    this.background.y = this.position * 0.1;
    this.background.y %= this.background.height * 2;
    if (this.background.y > $(window).height()) {
      this.background.y -= this.background.height * 2;
    }
    this.background2.y = this.position * 0.1 - this.background2.height;
    this.background2.y %= this.background2.height * 2;
    if (this.background2.y > $(window).height()) {
      this.background2.y -= this.background2.height * 2;
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
