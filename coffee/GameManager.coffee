"use strict"
Scene = require("./Scene")
InputManager = require("./InputManager")

class GameManager
  constructor: () ->
    @speed = 1
    @renderer = PIXI.IRenderer
    @currentScene = null
    @scenes = {}

    @speed = 1
    @rightButton = false
    @leftButton = false
    @upButton = false
    @downButton = false
    @shootButton = false
    @inputManager = new InputManager()

    return @
###
Create scene
###
GameManager::createScene = (id, TScene) ->
  return undefined if @scenes[id]

  scene = new TScene()
  @scenes[id] = scene

  return scene

GameManager::goToScene = (id) ->
  if @scenes[id]
    if @currentScene
      @currentScene.pause()
    @currentScene = @scenes[id]
    @currentScene.resume()
    return true
  else
    return false

GameManager::create = (width, height) ->
  return @ if @renderer

  @renderer = PIXI.autoDetectRenderer(width, height)
  @renderer.view.style.display = "block"
  @renderer.view.style.width = width
  @renderer.view.style.height = height
  @defaultWidth = width
  @defaultHeight = height
  document.body.appendChild(@renderer.view)

  window.addEventListener('resize', () ->
    GAME.renderer.resize(window.innerWidth, window.innerHeight)
    GAME.renderer.view.style.width = window.innerWidth+'px'
    GAME.renderer.view.style.height = window.innerHeight+'px'
  , true)

  requestAnimationFrame(@loop)
  return @

GameManager::loop = =>
  render = =>
#    GAME.stats.begin()#
    requestAnimationFrame(render)
    return if not GAME.currentScene or GAME.currentScene.isPaused()
    for object in GAME.currentScene.children
      object?.update?()
    GAME.currentScene.update()
    GAME.renderer.render(GAME.currentScene)
#    GAME.stats.end()
  render()
module.exports = GameManager