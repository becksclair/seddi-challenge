import React, { forwardRef, ReactElement, Ref, useImperativeHandle, useState } from 'react'
import styled from 'styled-components'

const NO_SELECTION = -1

const accentColor = '#1ac4c3'
const textColor = '#777'
const whiteColor = '#fff'
const hoverColor = '#f2f2f2'

const ListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0 0 1.2rem;
    max-height: 180px;
    overflow-y: scroll;
`

const ListItem = styled.li`
    list-style: none;
    padding: 0.5rem 0.5rem;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    transition: 0.2s;
    transition-timing-function: ease-in-out;
    font-size: 1.05rem;
    color: ${textColor};
  
    &:hover {
        transition: 0.2s;
        transition-timing-function: ease-in-out;
        background-color: ${hoverColor};
    }
    &:active {
        background-color: ${accentColor};
    }
`

const Radio = styled.input.attrs({ type: 'radio' })`
    zoom: 1.25;
`

export interface ListViewHandle {
    selectItem: (index: number) => void
}

interface ListViewProps {
    items: string[]
    selectedItem?: number
    onItemClick?: (index: number) => void
}

const ListView = forwardRef<ListViewHandle, ListViewProps>(
    (props: ListViewProps, ref: Ref<ListViewHandle>): ReactElement => {
        useImperativeHandle(ref, () => ({
            selectItem: (index: number) => {
                setSelectedItem(index)
            }
        }))

        const [selectedItem, setSelectedItem] = useState(props.selectedItem != null ? props.selectedItem : NO_SELECTION)

        const itemClicked = (index: number): void => {
            setSelectedItem(index)
            props.onItemClick?.(index)
        }

        return (
            <ListContainer>
                {props.items?.map((item, index) => (
                    <ListItem key={index}
                        style={{
                            backgroundColor: selectedItem == index ? accentColor : whiteColor,
                            color: selectedItem == index ? whiteColor : textColor
                        }}
                        onClick={() => itemClicked(index)}
                    >
                        <div>{item}</div>
                        <Radio type="radio" id={item} name="collection" value={index}
                            checked={selectedItem == index}
                            onChange={() => itemClicked(index)}
                        />
                    </ListItem>
                ))}
            </ListContainer>
        )
    }
)

ListView.displayName = 'ListView'
export default ListView
