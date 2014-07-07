"use strict"

define []
, () ->

	Geometry = {}

	Geometry.rectangleIntersectsRectangle = (rectA, rectB) ->
			return rectA.x >= rectB.x and rectA.y >= rectB.y and (rectA.x + rectA.width) <= (rectB.x + rectB.width) and (rectA.y + rectA.height) <= (rectB.y + rectB.height)
		
	return Geometry