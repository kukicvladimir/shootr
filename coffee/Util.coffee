###
	Maps string representation of common
	JS datatypes to type name
###
class2type =
	"[object Boolean]":   "boolean"
	"[object Number]":    "number"
	"[object String]":    "string"
	"[object Function]":  "function"
	"[object Array]":     "array"
	"[object Date]":      "date"
	"[object RegExp]":    "regexp"
	"[object Object]":    "object"

### 
	A shim to enable micro precision timer if available
	Otherwise, fallbacks to Date.now     
###
if window?
	window.performance = Date if not window.performance?

_ =
	toString:   Function::call.bind Object::toString
	hasOwn:     Function::call.bind Object::hasOwnProperty
	push:       Function::call.bind Array::push
	slice:      Function::call.bind Array::slice
	filter:     Function::call.bind Array::filter
	splice:     Function::call.bind Array::splice
	indexOf:    Function::call.bind Array::indexOf
	trim:       Function::call.bind String::trim

	###
		Useful and common meta helpers                                   
	###
	type: (obj) ->
		return String(obj) if not obj?
		return class2type[_.toString(obj)] or "object"

	isPlainObject: (obj) ->
		if (obj? or _.type(obj) isnt "object" or obj.nodeType?)
			return false
		try
			if obj.constructor? and not _.hasOwn(obj, "constructor") and 
			not _.hasOwn(obj.constructor::, "isPrototypeOf")
				return false
		catch e
			return false
		key = undefined
		continue for key in obj
		return (key is undefined) or _.hasOwn(obj, key)

	isFunction: (obj) ->
		return _.type(obj) is "function"

	isArray: Array.isArray or (obj) ->
		return _.type(obj) is "array"

	isWindow: (obj) ->
		return obj? and obj is obj.window

	isNumeric: (obj) ->
		return not isNaN(parseFloat(obj)) and isFinite(obj)

	###
		Array helpers ahead
	###
	chunk: (arr, chunkSize) ->
		i = 0
		return (arr.slice(i, i+=chunkSize) while i < arr.length)
	
	findOne: (arr, key, val) ->
		return _.find(arr, key, val)[0]

	find: (arr, key, val) -> 
		return arr.filter (el) ->
			return (el[key] is val) if _.type(key) isnt "object"
			for prop, pval of key
				if el[prop] isnt pval
					return false
			return true

	findOneAndRemove: (arr, key, val) ->
		t = _.findOne(arr, key, val)
		ind = arr.indexOf(arr, t)
		arr.splice(arr, ind, 1)

	remove: (arr, t) ->
		ind = arr.indexOf(arr, t)
		arr.splice(arr, ind, 1)

	flatten: (arr, level) ->
		out = []
		return arr if level is 0
		level--
		for elem in arr
			if _.isArray(elem)
				out = out.concat(flatten(elem, level))
			else out.push(elem)
		return out

	###
		Ripped off jquery
		Extend or merge one object with another
		Goes deep too.
	###
	extend: ->
		target  = arguments[0] or {}
		length  = arguments.length
		deep    = false
		i       = 1
		if _.type(target) is "boolean"
			deep = target
			target = arguments[1] or {}
			i = 2
		if _.type(target) isnt "object" and not _.isFunction(target)
			target = {}
		if length is i
			target = @
			--i
		while i < length
			continue if not (options = arguments[i++])?
			for name of options
				src = target[name]
				copy = options[name]
				continue if target is copy
				if deep and copy and (_.isPlainObject(copy) or (copyIsArray = _.isArray(copy)))
					if copyIsArray
						copyIsArray = false
						clone = if src and _.isArray(src) then src else []
					else
						clone = if src and _.isPlainObject(src) then src else {}
					target[name] = _.extend(deep, clone, copy)
				else if copy isnt undefined
					target[name] = copy
		return target

	groupBy: (attrib, objArray) ->
		out = {}
		for obj in objArray
			continue if not obj[attrib]?
			key = obj[attrib]
			out[key] or= []
			out[key].push obj
		return out

	mixin: (obj, mixincls) ->
		obj[name] = method for name, method of mixincls
		return obj

	include: (cls, mixincls) ->
		_.mixin(cls::, mixincls::)

	search: (obj, filterfunc) ->
		if _.isPlainObject(obj)
			return (val for key, val of obj when filterfunc(val))
		else if _.isArray(obj)
			return obj.filter(filterfunc)
		else return null

	lookup: (obj, str, data) ->
		fields = str.split(".")
		ref = obj
		while (field = fields.shift())? and ref?
			nref = ref[field]
			if not data?
				ref = nref
				continue
			if fields.length is 0
				if not nref?
					nref = ref[field] = {}
				if _.isPlainObject(data)
					nref = _.extend(true, ref[field], data)
				else 
					nref = ref[field] = data
				return nref
			if not nref?
				nref = ref[field] = {}
			ref = nref
		return ref

	splay: (objD, deep = false) ->
		paths = []
		splayRec = (obj, root) ->
			for key, val of obj
				if _.isPlainObject(val)
					res = splayRec(val, "#{root}.#{key}")
					paths.push(res) if deep
				else
					paths.push("#{root}.#{key}")
			return root
			
		for key, val of objD
			if _.isPlainObject(val)
				splayRec(val, "#{key}")
			else
				paths.push(key)
				
		return paths
		
String::format = String::f = () ->
	if arguments[0] instanceof Array
		args = arguments[0]
	else
		args = arguments
	i = args.length
	s = @
	while i--
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i])
	return s

String::endsWith = (str) ->
	return @lastIndexOf(str) + str.length is @length

String::startsWith = (str) ->
	return @indexOf(str) is 0

if typeof define is "function" and define.amd?
  define ->
  	return window["_"] = _
else if typeof module isnt "undefined" and module.exports?
	module.exports = _
else
	(global or window)["_"] = _
