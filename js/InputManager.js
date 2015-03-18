(function() {
  var InputManager;

  InputManager = (function() {
    function InputManager() {
      this._keysDown = {};
      this.Keys = {
        'BACKSPACE': 8,
        'COMMA': 188,
        'DELETE': 46,
        'DOWN': 40,
        'END': 35,
        'ENTER': 13,
        'ESCAPE': 27,
        'HOME': 36,
        'LEFT': 37,
        'NUMPAD_ADD': 107,
        'NUMPAD_DECIMAL': 110,
        'NUMPAD_DIVIDE': 111,
        'NUMPAD_ENTER': 108,
        'NUMPAD_MULTIPLY': 106,
        'NUMPAD_SUBTRACT': 109,
        'PAGE_DOWN': 34,
        'PAGE_UP': 33,
        'PERIOD': 190,
        'RIGHT': 39,
        'SPACE': 32,
        'TAB': 9,
        'UP': 38,
        'P': 80,
        'R': 82,
        'S': 83
      };
      window.addEventListener('keydown', this._onkeydown, false);
      window.addEventListener('keyup', this._onkeyup, false);
      return this;
    }

    return InputManager;

  })();

  InputManager.prototype._onkeydown = function(ev) {
    return GAME.inputManager._keysDown[ev.which] = true;
  };

  InputManager.prototype._onkeyup = function(ev) {
    return GAME.inputManager._keysDown[ev.which] = false;
  };

  InputManager.prototype.keyDown = function(key) {
    return !!GAME.inputManager._keysDown[key];
  };

  module.exports = InputManager;

}).call(this);
