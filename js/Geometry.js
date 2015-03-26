(function() {
  "use strict";
  var Geometry;

  Geometry = {};

  Geometry.rectangleIntersectsRectangle = function(rectA, rectB) {
    var aAboveB, aBelowB, aLeftOfB, aRightOfB;
    aLeftOfB = rectA.x < rectB.x;
    aRightOfB = rectA.x > (rectB.x + rectB.width);
    aAboveB = rectA.y > (rectB.y + rectB.height);
    aBelowB = rectA.y + rectA.height < rectB.y;
    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
  };

  module.exports = Geometry;

}).call(this);
