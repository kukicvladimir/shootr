(function() {
  define([], function() {
    var EventDispatcher, IS_ARRAY;
    IS_ARRAY = _.isArray;
    EventDispatcher = (function() {
      function EventDispatcher() {}

      return EventDispatcher;

    })();
    EventDispatcher.prototype.constructor = function() {
      return this.initDispatcher();
    };
    EventDispatcher.prototype.initDispatcher = function() {
      var _lastEvent;
      Object.defineProperty(this, "_ev_list_", {
        enumerable: false,
        value: {}
      });
      _lastEvent = null;
      Object.defineProperty(this, "lastEvent", {
        enumerable: false,
        set: function(val) {
          return _lastEvent = val;
        },
        get: function() {
          return _lastEvent;
        }
      });
      return this;
    };
    EventDispatcher.prototype.on = function(type, clb) {
      var t, _base, _base1, _i, _len;
      if (IS_ARRAY(type)) {
        for (_i = 0, _len = type.length; _i < _len; _i++) {
          t = type[_i];
          (_base = this._ev_list_)[t] || (_base[t] = []);
          this._ev_list_[t].push(clb);
        }
      } else {
        (_base1 = this._ev_list_)[type] || (_base1[type] = []);
        this._ev_list_[type].push(clb);
      }
      return clb;
    };
    EventDispatcher.prototype.removeTrigger = function(type, clb) {
      var ind, list;
      list = this._ev_list_[type];
      if (list == null) {
        return;
      }
      ind = list.indexOf(clb);
      if (ind !== -1) {
        list.splice(ind, 1);
        return clb = null;
      }
    };
    EventDispatcher.prototype.onXor = function(types, clb) {
      var _m;
      if (!IS_ARRAY(types)) {
        throw "Param(0) should be an array";
      }
      return this.on(types, _m = function() {
        var t, ts;
        clb.apply(this, arguments);
        ts = types.slice();
        while ((t = ts.pop()) != null) {
          this.removeTrigger(t, _m);
        }
        return this.onXor(types, clb);
      });
    };
    EventDispatcher.prototype.once = function(type, clb) {
      var _m;
      return this.on(type, _m = function() {
        var t, _results;
        clb.apply(this, arguments);
        if (IS_ARRAY(type)) {
          _results = [];
          while ((t = type.pop()) != null) {
            _results.push(this.removeTrigger(t, _m));
          }
          return _results;
        } else {
          return this.removeTrigger(type, _m);
        }
      });
    };
    EventDispatcher.prototype.removeAllTriggers = function(type) {
      var key, keys, list, _i, _j, _len, _len1, _ref;
      if (type) {
        return delete this._ev_list_[type];
      } else {
        keys = Object.keys(this._ev_list_);
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          key = keys[_i];
          _ref = this._ev_list_[key];
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            list = _ref[_j];
            this.removeTrigger(key, list);
          }
        }
        return delete this._ev_list_;
      }
    };
    EventDispatcher.prototype.trigger = (function() {
      var arr, arr_cnt;
      arr = [];
      arr_cnt = 0;
      return function(type, event) {
        var i, len, listenerArray;
        listenerArray = this._ev_list_[type];
        this.lastEvent = type;
        if (listenerArray == null) {
          return;
        }
        len = listenerArray.length;
        i = 0;
        while (i < len) {
          arr[arr_cnt++] = listenerArray[i++];
        }
        i = arr_cnt - len;
        while (i < arr_cnt) {
          arr[i++].call(this, event);
        }
        return arr_cnt -= len;
      };
    })();
    return EventDispatcher;
  });

}).call(this);
