import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import 'jest-canvas-mock'
import React from 'react'
import App from './App'
import Modal from 'react-modal'

describe('App General', () => {
    test('should display default app component', async () => {
        const containerEl = global.document.createElement('div')
        containerEl.setAttribute('id', 'root')

        const body = global.document.querySelector('body')
        body?.appendChild(containerEl)

        Modal.setAppElement(containerEl)

        // Render the App component
        render(<App />, { container: containerEl })

        // Check the title is displayed
        expect(screen.getByText('SEDDI Test')).toBeInTheDocument()
    })
})
