import BezierCurve2 from './BezierCurve2'
import Vector2 from './Vector2'

class BezierPath2 {
    public curves: BezierCurve2[]

    constructor(
        public showControlPoints: boolean = true,
        public showTangents: boolean = false,
        public showNormals: boolean = false
    ) {
        this.curves = []
    }

    public addCurve(curve: BezierCurve2): void {
        this.curves.push(curve)
    }

    public getSegment(segmentIndex: number): BezierCurve2 {
        return this.curves[segmentIndex]
    }

    public clearSelection(): void {
        this.curves.forEach(curve =>  curve.clearSelection())
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        this.curves.forEach(curve => {
            curve.draw(ctx)
            if (this.showControlPoints) {
                curve.drawControlPoints(ctx)
                curve.drawControlLines(ctx)
            }
            if (this.showTangents) {
                curve.drawTangent(ctx)
            }
            if (this.showNormals) {
                curve.drawNormal(ctx)
            }
        })
    }

    public drawControlPoints(ctx: CanvasRenderingContext2D): void {
        this.curves.forEach(curve => {
            curve.drawControlPoints(ctx)
        })
    }

    public drawTangents(ctx: CanvasRenderingContext2D): void {
        this.curves.forEach(curve => {
            curve.drawTangent(ctx)
        })
    }

    public drawNormals(ctx: CanvasRenderingContext2D): void {
        this.curves.forEach(curve => {
            curve.drawNormal(ctx)
        })
    }

    // Is the point inside the path?
    public selectClosestPoint(point: Vector2): number {
        for (let i = 0; i < this.curves.length; i++) {
            const curve = this.curves[i]

            curve.selectedPointIndex = curve.selectClosestPoint(point)

            if (curve.selectedPointIndex != -1) {
                this.curves[i] = curve
                return curve.selectedPointIndex
            }
        }
        return -1
    }

    public translatePoint(pointIdx: number, point: Vector2): void {
        const curvesLength = this.curves.length - 1

        for (let i = 0; i < this.curves.length; i++) {
            const curve = this.curves[i]

            if (curve.selectedPointIndex === pointIdx) {
                curve.translatePoint(pointIdx, point)
                this.curves[i] = curve
            }
        }

        // Move together the last segment if the path is joined
        const lastCurve = this.curves[curvesLength]
        if (pointIdx == 3 && lastCurve.selectedPointIndex == -1) {
            lastCurve.translatePoint(0, point)
            this.curves[curvesLength] = lastCurve
        }
    }

    public addSegment(): void {
        // Create a new curve, starting from the last point of the last curve

        const curvesLength = this.curves.length - 1

        const p0 = this.curves[curvesLength].points[3].clone()
        const p1 = this.curves[curvesLength].points[3].clone()
        const p2 = this.curves[curvesLength].points[3].clone()
        const p3 = this.curves[curvesLength].points[3].clone()

        p2.x += 100
        p2.y += 100
        p3.x += 100
        p3.y += 100

        const curve = new BezierCurve2(p0, p1, p2, p3)
        this.curves.push(curve)
    }
}

export default BezierPath2
