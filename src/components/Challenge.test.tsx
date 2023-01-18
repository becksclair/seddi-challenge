import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Challenge from './Challenge'
import 'jest-canvas-mock'

test('should render challenge', async () => {
    // Render the component
    render(<Challenge />)

    expect(screen.getByText('Modal Demo')).toBeInTheDocument()
    expect(screen.getByText('Bezier Demo')).toBeInTheDocument()
})
