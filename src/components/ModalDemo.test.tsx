import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ModalDemo from './ModalDemo'

test('Modal Demo should render', async () => {
    const demoTitle = 'Modal Demo'

    // Render the component
    render(<ModalDemo />)

    expect(screen.getByText(demoTitle)).toBeInTheDocument()
})
