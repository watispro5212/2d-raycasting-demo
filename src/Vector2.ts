
class Vector2 {
    x: number;
    y: number;

    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(vec: Vector2): Vector2 {
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

  
    subtract(vec: Vector2): Vector2 {
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }

    
     
    multiply(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

   returns {number} - The dot product.
     
    dot(vec: Vector2): number {
        return this.x * vec.x + this.y * vec.y;
    }

  
    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

   
    normalize(): Vector2 {
        const len = this.length();
        return len > 0 ? new Vector2(this.x / len, this.y / len) : new Vector2(0, 0);
    }
}

export default Vector2;
