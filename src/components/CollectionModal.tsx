import React, { useState, ReactElement, useEffect, useRef } from 'react'
import Modal from 'react-modal'

import styled from 'styled-components'
import ListView, { ListViewHandle } from './ListView'
import Button from './Button'

Modal.setAppElement(document.getElementById('root') as HTMLElement)

const NO_SELECTION = -1

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
    },
    content: {
        color: '#222',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '500px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
    },
}

const DialogTitle = styled.h2`
    text-align: center;
    font-size: 1.1rem;
    color: #777;
`

const NewCollectionName = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 0.5rem;
    gap: 0.5rem;
`

const StyledInput = styled.input`
    color: #444;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
    width: 100%;
    background-color: #fff;
    border: none;
    border-bottom: 2px solid #c4c4c4;
    font-size: 1.1rem;
  
    & :active, :focus {
      outline: none;
      transition: 100ms transform ease-in-out;
      border-bottom: 3px solid #c4c4c4;
      font-size: 1.15rem;
    }
`

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
    zoom: 1.25;
`

const ModalFooter = styled.div`
    display: flex;
    justify-content: right;
    gap: 10px;
`

interface CollectionModalProps {
    title: string
    collections?: string[]
    pickCollection: boolean
    isOpen: boolean
    onClose?: () => void
    onSave?: (collectionName: string) => void
}

const CollectionModal = (props: CollectionModalProps): ReactElement => {
    const listViewRef = useRef<ListViewHandle>(null)

    const [modalIsOpen, setIsOpen] = useState(false)
    const [newCollectionName, setNewCollectionName] = useState('')
    const [newCollectionSelected, setNewCollectionSelected] = useState(false)
    const [selectedCollection, setSelectedCollection] = useState(NO_SELECTION)

    const closeModal = (): void => {
        setIsOpen(false)
        props.onClose?.()
    }

    const saveCollection = (): void => {
        if (newCollectionSelected) {
            props.onSave?.(newCollectionName)
        }
        else {
            if (props.collections != null) {
                props.onSave?.(props.collections[selectedCollection])
            }
        }
        closeModal()
    }

    useEffect(() => {
        setIsOpen(props.isOpen)
    }, [props.isOpen])

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel={props.title}
            >
                <DialogTitle>{props.title}</DialogTitle>

                {/* TODO: Implement add image control */}

                <NewCollectionName>
                    <StyledInput
                        id="collectionName"
                        type="text"
                        placeholder={props.pickCollection ? 'New Collection' : 'Add a name'}
                        value={newCollectionName}
                        onChange={(e) => {
                            setNewCollectionName(e.target.value)
                            setNewCollectionSelected(true)

                            if (props.pickCollection) {
                                setSelectedCollection(NO_SELECTION)
                                listViewRef.current?.selectItem(NO_SELECTION)
                            }
                        }}
                    />
                    {props.pickCollection && (
                        <CheckBox type="checkbox"
                            checked={newCollectionSelected}
                            onChange={() => {
                                setSelectedCollection(NO_SELECTION)
                                setNewCollectionSelected(!newCollectionSelected)
                                listViewRef.current?.selectItem(NO_SELECTION)
                            }} />
                    )}
                </NewCollectionName>

                {/* If we're selecting collections show the list view */}
                {props.pickCollection && (props.collections != null) && (
                    <ListView ref={listViewRef} items={props.collections} selectedItem={selectedCollection}
                        onItemClick={(index) => {
                            setSelectedCollection(index)
                            setNewCollectionSelected(false)
                        }}
                    />
                )}

                {/* TODO: Implement description field */}

                <ModalFooter>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button default={true} onClick={saveCollection}>Save</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CollectionModal
