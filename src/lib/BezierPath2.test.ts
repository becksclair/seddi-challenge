import BezierPath2 from './BezierPath2'
import BezierCurve2 from './BezierCurve2'
import Vector2 from './Vector2'

describe('Vectors', () => {
    test('can instantiate BezierPath2 class', async () => {
        const path = new BezierPath2()

        expect(path).toBeInstanceOf(BezierPath2)
    })

    test('can add a curve to the path', async () => {
        const v0 = new Vector2(0, 0)
        const v1 = new Vector2(0, 0)
        const v2 = new Vector2(0, 0)
        const v3 = new Vector2(0, 0)
        const curve = new BezierCurve2(v0, v1, v2, v3)

        const path = new BezierPath2()
        path.addCurve(curve)

        expect(path.curves.length).toBe(1)
    })

    test('can get a curve from the path', async () => {
        const v0 = new Vector2(0, 0)
        const v1 = new Vector2(0, 0)
        const v2 = new Vector2(0, 0)
        const v3 = new Vector2(0, 0)
        const curve = new BezierCurve2(v0, v1, v2, v3)

        const path = new BezierPath2()
        path.addCurve(curve)

        expect(path.getSegment(0)).toBeInstanceOf(BezierCurve2)
        expect(path.getSegment(0)).toBe(curve)
    })
})
