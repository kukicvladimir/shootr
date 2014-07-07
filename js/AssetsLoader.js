(function() {
  define(["EventDispatcher"], function(EventDispatcher) {
    var AssetsLoader;
    AssetsLoader = (function() {
      function AssetsLoader(opts) {
        this._progress = {
          total: 0,
          done: false,
          loaded: 0
        };
        this.sprites = null;
      }

      return AssetsLoader;

    })();
    AssetsLoader.prototype.load = function(clb) {
      var assetsToLoader, loader;
      if (this._progress.done) {
        return;
      }
      assetsToLoader = ["resources/img/spaceship.gif", "resources/img/background.jpg"];
      loader = new PIXI.AssetLoader(assetsToLoader);
      loader.onComplete = (function(_this) {
        return function() {
          _this.sprites = PIXI.TextureCache;
          return _this._progress.done = true;
        };
      })(this);
      return loader.load();
    };
    AssetsLoader.prototype.showSpinner = function() {
      console.log("should spin something here");
      return this;
    };
    AssetsLoader.prototype.hideSpinner = function() {
      console.log("remove spinner");
      return this;
    };
    return AssetsLoader;
  });

}).call(this);
