"use strict";
exports.__esModule = true;
var Point = /** @class */ (function () {
    // private x: number;
    // private y: number;
    // public (default), private, protected
    function Point(x, y) {
        this.x = x;
        this.y = y;
        // this.x = x;
        // this.y = y;
        // Typescript will make a new variable with given names and assign the values automatically
    }
    Point.prototype.drawPoint = function () {
        console.log("X: " + this.x + ", Y: " + this.y);
    };
    Point.prototype.setX = function (x) {
        this.x = x;
    };
    Point.prototype.setY = function (y) {
        this.y = y;
    };
    Point.prototype.getX = function () {
        return this.x;
    };
    Point.prototype.getY = function () {
        return this.y;
    };
    return Point;
}());
exports.Point = Point;
