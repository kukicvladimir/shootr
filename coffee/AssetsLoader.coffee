define [
	"EventDispatcher"
],
(EventDispatcher) ->

	class AssetsLoader
		constructor: (opts) ->
			@_progress =
				total: 0
				done: false
				loaded: 0
			@sprites = null

	AssetsLoader::load = (clb) ->
		return if @_progress.done
		assetsToLoader = ["resources/img/spaceship.gif", "resources/img/background.jpg"]
		loader = new PIXI.AssetLoader(assetsToLoader)
		loader.onComplete = =>
			@sprites = PIXI.TextureCache
			@_progress.done = true
		loader.load()


	AssetsLoader::showSpinner = ->
		console.log "should spin something here"
		return @
		
	AssetsLoader::hideSpinner = ->
		console.log "remove spinner"
		return @

	return AssetsLoader