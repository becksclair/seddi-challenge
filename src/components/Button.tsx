import styled from 'styled-components'
import React, { ReactElement, ReactNode } from 'react'

const AccentColor   = '#1ac4c3'
const TextColor     = '#b2b2b2'
const DisabledColor = '#ccc'
const BorderColor   = '#c4c4c4'

const StyledButton = styled.button`
    background-color: #fff;
    color: ${TextColor};
    border: 2px solid ${BorderColor};
    padding: 4px 18px;
    min-width: 100px;
`

interface ButtonProps {
    onClick?: () => void
    disabled?: boolean
    default?: boolean
    children?: ReactNode
}

const Button = (props: ButtonProps): ReactElement => {
    const buttonColor = (): string => {
        if (props.disabled ?? false) {
            return DisabledColor
        }
        else if (props.default ?? false) {
            return AccentColor
        }
        else {
            return TextColor
        }
    }

    return (
        <StyledButton
            onClick={props.onClick}
            disabled={props.disabled}
            style={{
                color: buttonColor(),
                borderColor: buttonColor()
            }}
        >
            {props.children}
        </StyledButton>
    )
}

export default Button
