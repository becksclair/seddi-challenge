import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CollectionModal from './CollectionModal'
import React from 'react'
import Modal from 'react-modal'

const COLLECTIONS = [
    'Collection 1',
    'Collection 2',
    'Collection 3',
    'Collection 4',
    'Collection 5',
    'Collection 6',
]

describe('CollectionModal', () => {
    const containerEl = global.document.createElement('div')
    containerEl.setAttribute('id', 'root')

    const body = global.document.querySelector('body')
    body?.appendChild(containerEl)

    Modal.setAppElement(containerEl)

    const copyTitle = 'Copy Collection'
    const newTitle  = 'New Collection'

    test('should render copy collection modal', async () => {
        // Render the component
        render(<CollectionModal
            pickCollection={true}
            title={copyTitle}
            isOpen={true}
            collections={COLLECTIONS}
        />, { container: containerEl })

        expect(screen.getByText(copyTitle)).toBeInTheDocument()
    })

    test('should render new collection modal', async () => {
        // Render the component
        render(<CollectionModal
            pickCollection={false}
            title={newTitle}
            isOpen={true}
        />, { container: containerEl })

        expect(screen.getByText(newTitle)).toBeInTheDocument()
    })
})
