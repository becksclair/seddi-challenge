import Vector2 from './Vector2'

const LINE_COLOR = '#333'
const CTRL_POINT_COLOR = 'red'
const CTRL_SEL_POINT_COLOR = 'blue'
const CTRL_LINE_COLOR = 'red'
const DASHED_LINE_COLOR = '#666'

// Trig constants
const Pi = Math.PI
const TAU = 2 * Pi

class BezierCurve2 {
    public pointThickness = 4
    public selectedPointIndex = -1

    points: Vector2[] = []

    constructor(
        v0: Vector2, // Start point
        v1: Vector2, // Control point 1
        v2: Vector2, // Control point 2
        v3: Vector2  // End point
    ) {
        this.points = [v0, v1, v2, v3]
    }

    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

    // Get point at t (0 <= t <= 1) on the curve
    // https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Quadratic_curves
    public eval(t: number): Vector2 {
        const [v0, v1, v2, v3] = this.points

        const t2 = t * t
        const t3 = t2 * t
        const mt = 1 - t
        const mt2 = mt * mt
        const mt3 = mt2 * mt

        return new Vector2(
            v0.x * mt3 + v1.x * 3 * mt2 * t + v2.x * 3 * mt * t2 + v3.x * t3,
            v0.y * mt3 + v1.y * 3 * mt2 * t + v2.y * 3 * mt * t2 + v3.y * t3
        )
    }

    public drawPoint(ctx: CanvasRenderingContext2D, point: Vector2): void {
        ctx.beginPath()
        ctx.fillStyle = CTRL_SEL_POINT_COLOR
        ctx.ellipse(point.x, point.y, this.pointThickness, this.pointThickness, 0, 0, TAU)
        ctx.fill()
    }

    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

    public clearSelection(): void {
        this.selectedPointIndex = -1
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const [v0, v1, v2, v3] = this.points

        ctx.setLineDash([1, 0])

        ctx.beginPath()
        ctx.moveTo(v0.x, v0.y)

        ctx.bezierCurveTo(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y)
        ctx.strokeStyle = LINE_COLOR
        ctx.stroke()
    }

    public drawControlPoints(ctx: CanvasRenderingContext2D): void {
        const [v0, v1, v2, v3] = this.points

        // Draw control points
        if (this.selectedPointIndex == 0) {
            ctx.fillStyle = CTRL_SEL_POINT_COLOR
        }
        else {
            ctx.fillStyle = CTRL_POINT_COLOR
        }
        ctx.beginPath()
        ctx.ellipse(v0.x, v0.y, this.pointThickness, this.pointThickness, 0, 0, TAU)
        ctx.fill()

        if (this.selectedPointIndex == 1) {
            ctx.fillStyle = CTRL_SEL_POINT_COLOR
        }
        else {
            ctx.fillStyle = CTRL_POINT_COLOR
        }
        ctx.beginPath()
        ctx.ellipse(v1.x, v1.y, this.pointThickness, this.pointThickness, 0, 0, TAU)
        ctx.fill()

        if (this.selectedPointIndex == 2) {
            ctx.fillStyle = CTRL_SEL_POINT_COLOR
        }
        else {
            ctx.fillStyle = CTRL_POINT_COLOR
        }
        ctx.beginPath()
        ctx.ellipse(v2.x, v2.y, this.pointThickness, this.pointThickness, 0, 0, TAU)
        ctx.fill()

        if (this.selectedPointIndex == 3) {
            ctx.fillStyle = CTRL_SEL_POINT_COLOR
        }
        else {
            ctx.fillStyle = CTRL_POINT_COLOR
        }
        ctx.beginPath()
        ctx.ellipse(v3.x, v3.y, this.pointThickness, this.pointThickness, 0, 0, TAU)
        ctx.fill()
    }

    public drawControlLines(ctx: CanvasRenderingContext2D): void {
        const [v0, v1, v2, v3] = this.points

        ctx.strokeStyle = CTRL_LINE_COLOR

        // Draw control lines
        ctx.beginPath()
        ctx.moveTo(v0.x, v0.y)
        ctx.lineTo(v1.x, v1.y)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(v2.x, v2.y)
        ctx.lineTo(v3.x, v3.y)
        ctx.stroke()
    }

    public drawTangent(ctx: CanvasRenderingContext2D): void {
        const tangent = this.getTangent(0.5)
        const center = this.eval(0.5)

        ctx.beginPath()
        ctx.moveTo(center.x, center.y)
        ctx.lineTo(center.x + tangent.x * 100, center.y + tangent.y * 100)
        ctx.strokeStyle = DASHED_LINE_COLOR
        ctx.setLineDash([5, 5])
        ctx.stroke()
    }

    public drawNormal(ctx: CanvasRenderingContext2D): void {
        const normal = this.getNormal(0.5)
        const center = this.eval(0.5)

        ctx.beginPath()
        ctx.moveTo(center.x, center.y)
        ctx.lineTo(center.x + normal.x * 100, center.y + normal.y * 100)
        ctx.strokeStyle = DASHED_LINE_COLOR
        ctx.setLineDash([5, 5])
        ctx.stroke()
    }

    public getTangent(t: number): Vector2 {
        const [v0, v1, v2, v3] = this.points

        const mt = 1 - t
        const mt2 = mt * mt
        const t2 = t * t

        return new Vector2(
            v0.x * -3 * mt2 + v1.x * (3 * mt2 - 6 * mt * t) + v2.x * (6 * mt * t - 3 * t2) + v3.x * 3 * t2,
            v0.y * -3 * mt2 + v1.y * (3 * mt2 - 6 * mt * t) + v2.y * (6 * mt * t - 3 * t2) + v3.y * 3 * t2
        )
    }

    public getNormal(t: number): Vector2 {
        const tangent = this.getTangent(t)
        return new Vector2(-tangent.y, tangent.x)
    }

    // This is the good one that selects the closest point
    public selectClosestPoint(point: Vector2): number {
        const maxDistance = 7.0
        let inRange = false

        const p = this.points.reduce((prev, curr) => {
            const distance = point.distanceTo(curr)
            if (distance < maxDistance) {
                inRange = true
                return curr
            }
            return prev
        }, this.points[0])

        // If the point is not in range, then we deselect the point
        if (!inRange) {
            this.selectedPointIndex = -1
            return this.selectedPointIndex
        }

        this.selectedPointIndex = this.points.indexOf(p)
        return this.selectedPointIndex
    }

    public translatePoint(pointIdx: number, delta: Vector2): void {
        this.points[pointIdx] = delta
    }
}

export default BezierCurve2
