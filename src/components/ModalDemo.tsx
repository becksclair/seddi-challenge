import React, { ReactElement, useState } from 'react'
import CollectionModal from './CollectionModal'

import styled from 'styled-components'

const COLLECTIONS = [
    'Collection 1',
    'Collection 2',
    'Collection 3',
    'Collection 4',
    'Collection 5',
    'Collection 6',
]

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
`

const ModalDemo = (): ReactElement => {
    const [pickCollectionIsOpen, setPickCollectionIsOpen] = useState(false)
    const [newCollectionIsOpen, setNewCollectionIsOpen]   = useState(false)

    const openPickCollectionModal   = (): void => setPickCollectionIsOpen(true)
    const pickCollectionModalClosed = (): void => setPickCollectionIsOpen(false)
    const openNewCollectionModal    = (): void => setNewCollectionIsOpen(true)
    const newCollectionModalClosed  = (): void => setNewCollectionIsOpen(false)

    const saveChosenCollection = (collectionName: string): void => {
        alert(`Chosen collection: ${collectionName}`)
    }

    const saveNewCollection = (collectionName: string): void => {
        alert(`New collection: ${collectionName}`)
    }

    return (
        <div>
            <h2>Modal Demo</h2>

            <ButtonWrapper>
                <button onClick={openPickCollectionModal}>Copy Collection</button>
                <button onClick={openNewCollectionModal}>New Collection</button>
            </ButtonWrapper>

            <CollectionModal
                pickCollection={true}
                title="Copy Collection"
                isOpen={pickCollectionIsOpen}
                collections={COLLECTIONS}
                onClose={pickCollectionModalClosed}
                onSave={saveChosenCollection}
            />

            <CollectionModal
                pickCollection={false}
                title="New Collection"
                isOpen={newCollectionIsOpen}
                onClose={newCollectionModalClosed}
                onSave={saveNewCollection}
            />
        </div>
    )
}

export default ModalDemo
