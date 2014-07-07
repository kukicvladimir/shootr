define [], ->
	IS_ARRAY = _.isArray

	class EventDispatcher

	EventDispatcher::constructor = ->
		@initDispatcher()

	EventDispatcher::initDispatcher = ->
		Object.defineProperty(@, "_ev_list_", {
			enumerable: false
			value: {}
		})

		_lastEvent = null
		Object.defineProperty(@, "lastEvent", {
			enumerable: false
			set: (val) ->
				_lastEvent = val
			get: ->
				return _lastEvent
		})
		
		return @

	EventDispatcher::on = (type, clb) ->
		if IS_ARRAY(type)
			for t in type
				@_ev_list_[t] or= []
				@_ev_list_[t].push(clb)
		else
			@_ev_list_[type] or= []
			@_ev_list_[type].push(clb)
		return clb

	EventDispatcher::removeTrigger = (type, clb) ->
		list = @_ev_list_[type]
		return unless list?
		ind = list.indexOf(clb)
		if ind isnt -1
			list.splice(ind, 1)
			clb = null
			
	EventDispatcher::onXor = (types, clb) ->
		throw "Param(0) should be an array" unless IS_ARRAY(types)
		@on(types, _m = ->
			clb.apply(@, arguments)
			ts = types.slice()
			while (t = ts.pop())?
				@removeTrigger(t, _m)
			@onXor(types, clb)
		)

	EventDispatcher::once = (type, clb) ->
		@on(type, _m = ->
			clb.apply(@, arguments)
			if IS_ARRAY(type)
				while (t = type.pop())?
					@removeTrigger(t, _m)
			else
				@removeTrigger(type, _m)
		)
		
	EventDispatcher::removeAllTriggers = (type) ->
		if type
			delete @_ev_list_[type]
		else
			keys = Object.keys(@_ev_list_)
			for key in keys
				@removeTrigger(key, list) for list in @_ev_list_[key]
			delete @_ev_list_
		
	EventDispatcher::trigger = do ->
		arr = []
		arr_cnt = 0
		return (type, event) ->
			listenerArray = @_ev_list_[type]
			@lastEvent = type
			return if not listenerArray?
			len = listenerArray.length
			i = 0
			while i < len
				arr[arr_cnt++] = listenerArray[i++]
			i = arr_cnt - len
			while i < arr_cnt
				arr[i++].call(@, event)
			arr_cnt -= len

	return EventDispatcher