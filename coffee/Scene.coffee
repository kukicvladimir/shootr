"use strict"
PIXI = require("../js/vendor/pixi/bin/pixi.dev.js")
class Scene extends PIXI.Stage
  constructor: (background) ->
    super(background)
    @paused = false
    return @

  Scene::onUpdate = (updateCB) ->
    @updateCB = updateCB

  Scene::update = () ->
    @updateCB()

  Scene::pause = () ->
    @paused = true

  Scene::resume = () ->
    @paused = false

  Scene::isPaused = ()  ->
    return @paused

module.exports = Scene