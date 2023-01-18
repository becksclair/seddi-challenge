class Vector2 {
    constructor(
        public x: number,
        public y: number
    ) { }

    public add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y)
    }

    public sub(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y)
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    public equals(vector: Vector2): boolean {
        return this.x === vector.x && this.y === vector.y
    }

    public clone(): Vector2 {
        return new Vector2(this.x, this.y)
    }

    public normalize(): Vector2 {
        const length = this.length()
        return new Vector2(this.x / length, this.y / length)
    }

    public multiplyScalar(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar)
    }

    public dot(vector: Vector2): number {
        return this.x * vector.x + this.y * vector.y
    }

    public cross(vector: Vector2): number {
        return this.x * vector.y - this.y * vector.x
    }

    public distanceTo(vector: Vector2): number {
        return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2))
    }
}

export default Vector2
