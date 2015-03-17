(function() {
  "use strict";
  var Geometry;

  Geometry = {};

  Geometry.rectangleIntersectsRectangle = function(rectA, rectB) {
    return rectA.x >= rectB.x && rectA.y >= rectB.y && (rectA.x + rectA.width) <= (rectB.x + rectB.width) && (rectA.y + rectA.height) <= (rectB.y + rectB.height);
  };

  return Geometry;

}).call(this);
