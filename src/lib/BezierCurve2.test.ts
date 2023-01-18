import BezierCurve2 from './BezierCurve2'
import Vector2 from './Vector2'

describe('BezierCurves 2D', () => {
    test('can instantiate BezierCurve2 class', async () => {
        const v0 = new Vector2(0, 0)
        const v1 = new Vector2(0, 0)
        const v2 = new Vector2(0, 0)
        const v3 = new Vector2(0, 0)
        const bezierCurve2 = new BezierCurve2(v0, v1, v2, v3)

        expect(bezierCurve2).toBeInstanceOf(BezierCurve2)
    })

    test('eval should return the correct point', async () => {
        const v0 = new Vector2(0, 0)
        const v1 = new Vector2(0, 0)
        const v2 = new Vector2(0, 0)
        const v3 = new Vector2(0, 0)

        const bezierCurve2 = new BezierCurve2(v0, v1, v2, v3)

        const t = 0.5
        const expected = new Vector2(0, 0)
        const actual = bezierCurve2.eval(t)
        expect(actual).toEqual(expected)
    })
})
