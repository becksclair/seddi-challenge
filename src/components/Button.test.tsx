import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Button from './Button'

test('button should render', async () => {
    const buttonTitle = 'Test Button'

    // Render the component
    render(<Button default={true}>{buttonTitle}</Button>)

    expect(screen.getByText(buttonTitle)).toBeInTheDocument()
})
