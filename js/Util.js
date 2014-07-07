
/*
	Maps string representation of common
	JS datatypes to type name
 */

(function() {
  var class2type, _;

  class2type = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regexp",
    "[object Object]": "object"
  };


  /* 
  	A shim to enable micro precision timer if available
  	Otherwise, fallbacks to Date.now
   */

  if (typeof window !== "undefined" && window !== null) {
    if (window.performance == null) {
      window.performance = Date;
    }
  }

  _ = {
    toString: Function.prototype.call.bind(Object.prototype.toString),
    hasOwn: Function.prototype.call.bind(Object.prototype.hasOwnProperty),
    push: Function.prototype.call.bind(Array.prototype.push),
    slice: Function.prototype.call.bind(Array.prototype.slice),
    filter: Function.prototype.call.bind(Array.prototype.filter),
    splice: Function.prototype.call.bind(Array.prototype.splice),
    indexOf: Function.prototype.call.bind(Array.prototype.indexOf),
    trim: Function.prototype.call.bind(String.prototype.trim),

    /*
    		Useful and common meta helpers
     */
    type: function(obj) {
      if (obj == null) {
        return String(obj);
      }
      return class2type[_.toString(obj)] || "object";
    },
    isPlainObject: function(obj) {
      var e, key, _i, _len;
      if ((obj != null) || _.type(obj) !== "object" || (obj.nodeType != null)) {
        return false;
      }
      try {
        if ((obj.constructor != null) && !_.hasOwn(obj, "constructor") && !_.hasOwn(obj.constructor.prototype, "isPrototypeOf")) {
          return false;
        }
      } catch (_error) {
        e = _error;
        return false;
      }
      key = void 0;
      for (_i = 0, _len = obj.length; _i < _len; _i++) {
        key = obj[_i];
        continue;
      }
      return (key === void 0) || _.hasOwn(obj, key);
    },
    isFunction: function(obj) {
      return _.type(obj) === "function";
    },
    isArray: Array.isArray || function(obj) {
      return _.type(obj) === "array";
    },
    isWindow: function(obj) {
      return (obj != null) && obj === obj.window;
    },
    isNumeric: function(obj) {
      return !isNaN(parseFloat(obj)) && isFinite(obj);
    },

    /*
    		Array helpers ahead
     */
    chunk: function(arr, chunkSize) {
      var i;
      i = 0;
      return ((function() {
        var _results;
        _results = [];
        while (i < arr.length) {
          _results.push(arr.slice(i, i += chunkSize));
        }
        return _results;
      })());
    },
    findOne: function(arr, key, val) {
      return _.find(arr, key, val)[0];
    },
    find: function(arr, key, val) {
      return arr.filter(function(el) {
        var prop, pval;
        if (_.type(key) !== "object") {
          return el[key] === val;
        }
        for (prop in key) {
          pval = key[prop];
          if (el[prop] !== pval) {
            return false;
          }
        }
        return true;
      });
    },
    findOneAndRemove: function(arr, key, val) {
      var ind, t;
      t = _.findOne(arr, key, val);
      ind = arr.indexOf(arr, t);
      return arr.splice(arr, ind, 1);
    },
    remove: function(arr, t) {
      var ind;
      ind = arr.indexOf(arr, t);
      return arr.splice(arr, ind, 1);
    },
    flatten: function(arr, level) {
      var elem, out, _i, _len;
      out = [];
      if (level === 0) {
        return arr;
      }
      level--;
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        elem = arr[_i];
        if (_.isArray(elem)) {
          out = out.concat(flatten(elem, level));
        } else {
          out.push(elem);
        }
      }
      return out;
    },

    /*
    		Ripped off jquery
    		Extend or merge one object with another
    		Goes deep too.
     */
    extend: function() {
      var clone, copy, copyIsArray, deep, i, length, name, options, src, target;
      target = arguments[0] || {};
      length = arguments.length;
      deep = false;
      i = 1;
      if (_.type(target) === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (_.type(target) !== "object" && !_.isFunction(target)) {
        target = {};
      }
      if (length === i) {
        target = this;
        --i;
      }
      while (i < length) {
        if ((options = arguments[i++]) == null) {
          continue;
        }
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (_.isPlainObject(copy) || (copyIsArray = _.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && _.isArray(src) ? src : [];
            } else {
              clone = src && _.isPlainObject(src) ? src : {};
            }
            target[name] = _.extend(deep, clone, copy);
          } else if (copy !== void 0) {
            target[name] = copy;
          }
        }
      }
      return target;
    },
    groupBy: function(attrib, objArray) {
      var key, obj, out, _i, _len;
      out = {};
      for (_i = 0, _len = objArray.length; _i < _len; _i++) {
        obj = objArray[_i];
        if (obj[attrib] == null) {
          continue;
        }
        key = obj[attrib];
        out[key] || (out[key] = []);
        out[key].push(obj);
      }
      return out;
    },
    mixin: function(obj, mixincls) {
      var method, name;
      for (name in mixincls) {
        method = mixincls[name];
        obj[name] = method;
      }
      return obj;
    },
    include: function(cls, mixincls) {
      return _.mixin(cls.prototype, mixincls.prototype);
    },
    search: function(obj, filterfunc) {
      var key, val;
      if (_.isPlainObject(obj)) {
        return (function() {
          var _results;
          _results = [];
          for (key in obj) {
            val = obj[key];
            if (filterfunc(val)) {
              _results.push(val);
            }
          }
          return _results;
        })();
      } else if (_.isArray(obj)) {
        return obj.filter(filterfunc);
      } else {
        return null;
      }
    },
    lookup: function(obj, str, data) {
      var field, fields, nref, ref;
      fields = str.split(".");
      ref = obj;
      while (((field = fields.shift()) != null) && (ref != null)) {
        nref = ref[field];
        if (data == null) {
          ref = nref;
          continue;
        }
        if (fields.length === 0) {
          if (nref == null) {
            nref = ref[field] = {};
          }
          if (_.isPlainObject(data)) {
            nref = _.extend(true, ref[field], data);
          } else {
            nref = ref[field] = data;
          }
          return nref;
        }
        if (nref == null) {
          nref = ref[field] = {};
        }
        ref = nref;
      }
      return ref;
    },
    splay: function(objD, deep) {
      var key, paths, splayRec, val;
      if (deep == null) {
        deep = false;
      }
      paths = [];
      splayRec = function(obj, root) {
        var key, res, val;
        for (key in obj) {
          val = obj[key];
          if (_.isPlainObject(val)) {
            res = splayRec(val, "" + root + "." + key);
            if (deep) {
              paths.push(res);
            }
          } else {
            paths.push("" + root + "." + key);
          }
        }
        return root;
      };
      for (key in objD) {
        val = objD[key];
        if (_.isPlainObject(val)) {
          splayRec(val, "" + key);
        } else {
          paths.push(key);
        }
      }
      return paths;
    }
  };

  String.prototype.format = String.prototype.f = function() {
    var args, i, s;
    if (arguments[0] instanceof Array) {
      args = arguments[0];
    } else {
      args = arguments;
    }
    i = args.length;
    s = this;
    while (i--) {
      s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
    }
    return s;
  };

  String.prototype.endsWith = function(str) {
    return this.lastIndexOf(str) + str.length === this.length;
  };

  String.prototype.startsWith = function(str) {
    return this.indexOf(str) === 0;
  };

  if (typeof define === "function" && (define.amd != null)) {
    define(function() {
      return window["_"] = _;
    });
  } else if (typeof module !== "undefined" && (module.exports != null)) {
    module.exports = _;
  } else {
    (global || window)["_"] = _;
  }

}).call(this);
