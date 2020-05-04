export class Point
{
    // private x: number;
    // private y: number;
    
    // public (default), private, protected

    constructor (private x: number,private y?: number)     // ? makes this optional
    {
        // this.x = x;
        // this.y = y;
        // Typescript will make a new variable with given names and assign the values automatically
    }

    drawPoint()
    {
        console.log("X: "+ this.x +", Y: "+this.y);
    }

    setX(x: number)        // Property for X
    {
        this.x = x;
    }

    setY(y: number)
    {
        this.y = y;
    }

    getX()
    {
        return this.x;
    }

    getY()
    {
        return this.y;
    }
}