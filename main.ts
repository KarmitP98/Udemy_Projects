/*
interface Point {
    x: number,
    y: number
}
*/
// INSTEAD OF USING INTERFACE USE CLASS

class Point
{
    x: Number;
    y: Number;

    draw(){
        // ...
        console.log("X: "+this.x +", Y: "+this.y);
    }

    getDistance(another: Point){
        // ...
    }
}

let point: Point;
point.draw();
