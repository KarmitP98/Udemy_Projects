/*
interface Point {
    x: number,
    y: number
}
*/
// INSTEAD OF USING INTERFACE USE CLASS
var Point = /** @class */ (function () {
    function Point() {
    }
    Point.prototype.draw = function () {
        // ...
        console.log("X: " + this.x + ", Y: " + this.y);
    };
    Point.prototype.getDistance = function (another) {
        // ...
    };
    return Point;
}());
var point;
point.draw();
