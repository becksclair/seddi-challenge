import React, { MouseEvent, ReactElement, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import BezierCurve2 from '../lib/BezierCurve2'
import BezierPath2 from '../lib/BezierPath2'
import Vector2 from '../lib/Vector2'

// Mock Data •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

function CreateCurves(): BezierCurve2[] {
    const cur1p0 = new Vector2(50, 200)
    const cur1p1 = new Vector2(180, 80)
    const cur1p2 = new Vector2(380, 80)
    const cur1p3 = new Vector2(550, 200)

    const curve1 = new BezierCurve2(cur1p0, cur1p1, cur1p2, cur1p3)

    // const cur2p0 = new Vector2(225, 100)
    // const cur2p1 = new Vector2(300, 125)
    // const cur2p2 = new Vector2(450, 200)
    // const cur2p3 = new Vector2(500, 100)
    //
    // const curve2 = new BezierCurve2(cur2p0, cur2p1, cur2p2, cur2p3)

    return [
        curve1,
        // curve2
    ]
}

// •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`

const OptionsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 100%;
`

const Canvas = styled.canvas`
    background-color: #eee;
    border: 1px solid black;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`

const BezierCurves = (): ReactElement => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [loaded, setLoaded] = useState(false)

    const [showControlPoints, getShowControlPoints] = useState(true)
    const [showTangents, getShowTangents] = useState(true)
    const [showNormals, getShowNormals] = useState(true)

    const [isDragging, setIsDragging] = useState(false)
    const [selectedPathIndex, setSelectedPathIndex] = useState(-1)
    const [selectedPointIdx, setSelectedPointIdx] = useState(-1)

    const [bezierPaths] = useState<BezierPath2[]>([])

    // Create Initial Data •••••••••••••••••••••••••••••••••••••••••••••••••••

    if (!loaded) {
        const path = new BezierPath2()
        const curves = CreateCurves()

        curves.forEach(curve => path.addCurve(curve))
        bezierPaths.push(path)

        bezierPaths.forEach(path => {
            path.showControlPoints = showControlPoints
            path.showNormals = showNormals
            path.showTangents = showTangents
        })
        setLoaded(true)
    }

    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

    const appendCurve = (): void => {
        bezierPaths[0].addSegment()
        redraw()
    }

    const getMousePos = (canvas: HTMLCanvasElement, evt: MouseEvent<HTMLCanvasElement>): Vector2 => {
        const rect = canvas.getBoundingClientRect()
        return new Vector2(evt.clientX - rect.left, evt.clientY - rect.top)
    }

    const canvasMouseDown = (e: MouseEvent<HTMLCanvasElement>): void => {
        // Only handle left mouse button
        if (e.button != 0) {
            return
        }

        setIsDragging(true)

        const mousePos = getMousePos(getCanvas(), e)
        const mousePosVec = new Vector2(mousePos.x, mousePos.y)

        bezierPaths.forEach((path, idx) => {
            path.clearSelection()
            setSelectedPathIndex(idx)
            setSelectedPointIdx(path.selectClosestPoint(mousePosVec))
        })
    }

    const canvasMouseUp = (): void => {
        setIsDragging(false)
        redraw()
    }

    const canvasMouseDrag = (e: MouseEvent<HTMLCanvasElement>): void => {
        if (!isDragging) return

        const mousePos = getMousePos(getCanvas(), e)
        const mousePosVec = new Vector2(mousePos.x, mousePos.y)

        // Translate the selected point
        const path = bezierPaths[selectedPathIndex]
        path.translatePoint(selectedPointIdx, mousePosVec)

        redraw()
    }

    const clearCanvas = (): void => {
        const canvas = getCanvas()
        const ctx = getCanvasCtx()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    const redraw = (): void => {
        clearCanvas()
        bezierPaths.forEach(path => {
            path.draw(getCanvasCtx())
        })
    }

    const getCanvas = (): HTMLCanvasElement => {
        const canvas = canvasRef.current
        if (canvas == null) {
            throw new Error('Canvas is null')
        }
        return canvas
    }

    const getCanvasCtx = (): CanvasRenderingContext2D => {
        const ctx = getCanvas().getContext('2d')
        if (ctx == null) {
            throw new Error('ctx is null')
        }

        return ctx
    }

    // •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

    useEffect(() => {
        bezierPaths.forEach(path => {
            path.showControlPoints = showControlPoints
            path.showNormals = showNormals
            path.showTangents = showTangents
        })
        clearCanvas()
        redraw()
    }, [showControlPoints, showTangents, showNormals])

    return (
        <Wrapper>
            <h2>Bezier Demo</h2>

            <OptionsWrapper>
                <label htmlFor="showControlPoints">
                    <input
                        id="showControlPoints"
                        type="checkbox"
                        checked={showControlPoints}
                        onChange={() =>
                            getShowControlPoints(!showControlPoints)
                        }
                    />
                    Show Control Points
                </label>

                <label htmlFor="showTangents">
                    <input
                        id="showTangents"
                        type="checkbox"
                        checked={showTangents}
                        onChange={() => getShowTangents(!showTangents)}
                    />
                    Display Tangent
                </label>

                <label htmlFor="showNormals">
                    <input
                        id="showNormals"
                        type="checkbox"
                        checked={showNormals}
                        onChange={() => getShowNormals(!showNormals)}
                    />
                    Display Normal
                </label>
            </OptionsWrapper>

            <label htmlFor="calculatePointT">
                Calculate Point T
                <input
                    id="calculatePointT"
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    style={{ marginLeft: '15px', width: '50px' }}
                    onChange={e => {
                        redraw()

                        const t = parseFloat(e.target.value)
                        const path = bezierPaths[0]
                        const curve = path.getSegment(0)
                        const point = curve.eval(t)
                        curve.drawPoint(getCanvasCtx(), point)
                    }}
                />
            </label>
            <button onClick={appendCurve}>Add Curve</button>

            <Canvas
                ref={canvasRef}
                width={700}
                height={300}
                onMouseDown={canvasMouseDown}
                onMouseUp={canvasMouseUp}
                onMouseMove={canvasMouseDrag}></Canvas>
        </Wrapper>
    )
}

export default BezierCurves
