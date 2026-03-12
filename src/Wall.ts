import Vector2 from './Vector2';

class Wall {
    start: Vector2;
    end: Vector2;

    
    constructor(start: Vector2, end: Vector2) {
        this.start = start;
        this.end = end;
    }

    
    getLength(): number {
        return this.start.subtract(this.end).length();
    }

  
    getMidpoint(): Vector2 {
        return new Vector2((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2);
    }

   
    containsPoint(point: Vector2, tolerance: number = 0.01): boolean {
        const d1 = this.start.subtract(point).length();
        const d2 = point.subtract(this.end).length();
        const wallLen = this.getLength();
        return Math.abs(d1 + d2 - wallLen) < tolerance;
    }
}

export default Wall;
