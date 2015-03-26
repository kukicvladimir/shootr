"use strict"

Geometry = {}

Geometry.rectangleIntersectsRectangle = (rectA, rectB) ->
  aLeftOfB = rectA.x < rectB.x
  aRightOfB = rectA.x > (rectB.x+rectB.width)
  aAboveB = rectA.y > (rectB.y+rectB.height)
  aBelowB = rectA.y+rectA.height < rectB.y

  return !( aLeftOfB || aRightOfB || aAboveB || aBelowB )

module.exports = Geometry