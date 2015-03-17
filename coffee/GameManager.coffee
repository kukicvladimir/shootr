"use strict"
Scene = require("./Scene")
class GameManager
  constructor: () ->
    @renderer = PIXI.IRenderer
    @currentScene = null
    @scenes = {}

    @speed = 1
    @rightButton = false
    @leftButton = false
    @upButton = false
    @downButton = false
    @shootButton = false

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

  requestAnimationFrame(@loop)
  return @

GameManager::loop = =>
  render = =>
    requestAnimationFrame(render)
    return if not GAME.currentScene or GAME.currentScene.isPaused()
    GAME.currentScene.update()
    GAME.renderer.render(GAME.currentScene)

  render()
module.exports = GameManager