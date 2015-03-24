"use strict"
#
class HUDManager
  constructor: (scene) ->
    @score = 0
    @scoreText = new PIXI.Text("0", {font: "bold italic 40px Pixelate", fill: "#5ACAFA", align: "center", stroke: "#ffffff", strokeThickness: 7})
    @healthBar = new PIXI.Graphics()
    @lifesText = new PIXI.Text("a", {font: "60px Pixelate", fill: "#FF0000", align: "center"})
    @init(scene)
    return @


HUDManager::init = (scene) ->
  scene.addChild(@scoreText)
  @updateHealthBarAndLifes(scene.player.health, scene.player.baseHealth, scene.player.lifes)
  scene.addChild(@healthBar)

  scene.addChild(@lifesText)

HUDManager::updateScore = (score) ->
  @score += score
  @scoreText.setText(@score)

HUDManager::updateHealthBarAndLifes = (health, baseHealth, lifes) ->
  @healthBar.clear()
  @healthBar.lineStyle(4, 0xe0e0e0, 1);
  @healthBar.beginFill(0x000000, 1)
  @healthBar.drawRect($(window).width()-430, 5, 400, 30)
  @healthBar.lineStyle(0)
  @healthBar.beginFill(0x92F72D, 1) if health >= baseHealth * 0.5
  @healthBar.beginFill(0xFFF70D, 1) if (health < baseHealth * 0.5 and health >= baseHealth * 0.25)
  @healthBar.beginFill(0xFF0000, 1) if health < baseHealth * 0.25
  @healthBar.drawRect($(window).width()-430, 7, health*400/baseHealth, 27)

  text = ""
  text +="a" for life in [0...lifes]

  @lifesText.position.x = $(window).width()-200
  @lifesText.position.y = 40
  @lifesText.setText(text)

module.exports = HUDManager