(function() {
  var Scene, SplashScreen,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Scene = require("../Scene");

  SplashScreen = (function(superClass) {
    extend(SplashScreen, superClass);

    function SplashScreen() {
      SplashScreen.__super__.constructor.call(this);
      this.bunny = PIXI.Sprite.fromImage("resources/img/spaceship.png");
      this.bunny.anchor.x = 0.5;
      this.bunny.anchor.y = 0.5;
      this.bunny.position.x = $(window).width() / 2 - this.bunny.width / 2;
      this.bunny.position.y = $(window).height() / 2 - this.bunny.height / 2;
      this.bunny.alpha = 0;
      this.addChild(this.bunny);
    }

    return SplashScreen;

  })(Scene);

  SplashScreen.prototype.update = (function() {
    if (this.bunny.alpha < 1) {
      this.bunny.alpha += 0.01;
    }
    this.bunny.rotation += 0.1;
    if (this.bunny.alpha >= 1) {
      return GAME.goToScene("mainMenu");
    }
  });

  module.exports = SplashScreen;

}).call(this);
