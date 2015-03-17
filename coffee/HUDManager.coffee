"use strict"

$ = require("jquery")
$$ = require("jquery-ui")
class HUDManager
  constructor: () ->
    @score = 0
    @scoreText = new PIXI.Text("0", {font: "bold italic 60px Arvo", fill: "#000000", align: "center", stroke: "#ffffff", strokeThickness: 7})
    @healthBar = new PIXI.Graphics()
    @lifesText = new PIXI.Text("♥", {font: "bold italic 60px Arvo", fill: "#FF0000", align: "center"})
    @init()
    super


HUDManager::init = () ->
  player = GAME.player

  GAME.stage.addChild(@scoreText)
  @updateHealthBarAndLifes(player.health, player.baseHealth, player.lifes)
  GAME.stage.addChild(@healthBar)


  GAME.stage.addChild(@lifesText)

HUDManager::updateScore = (score) ->
  @score += score
  @scoreText.setText(@score)

HUDManager::updateHealthBarAndLifes = (health, baseHealth, lifes) ->
  @healthBar.clear()
  @healthBar.lineStyle(4, 0xe0e0e0, 1);
  @healthBar.drawRect($(window).width()-430, 5, 400, 30)
  @healthBar.lineStyle(0)
  @healthBar.beginFill(0x92F72D, 1) if health >= baseHealth * 0.5
  @healthBar.beginFill(0xFFF70D, 1) if health < baseHealth * 0.5
  @healthBar.beginFill(0xFF0000, 1) if health < baseHealth * 0.25
  @healthBar.drawRect($(window).width()-430, 6, health*400/baseHealth, 29)

  text = ""
  text +="♥" for life in [0...lifes]

  @lifesText.position.x = $(window).width()-150
  @lifesText.position.y = 50
  @lifesText.setText(text)

return HUDManager