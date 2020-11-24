import React from 'react'
import styled from '@emotion/styled'
import {css} from '@emotion/react'

const InputText = styled.input`
    padding:1rem 3rem 1rem 1rem;
    border-radius:1rem;
    min-width:300px;
    width:0;
    transition:.2s;
    background: var(--black);
    box-shadow:0px 0px 0px black, -0px -0px 0px rgba(255,255,255,.16);
    border:none;
    outline:none;
    color:white;

    ::placeholder{
        color:rgba(255,255,255,.40);
    }

    :hover{
        transition:.2s;
        box-shadow:3px 3px 8px black, -3px -3px 8px rgba(255,255,255,.16);
    }
    
    :focus{
        transition:.2s;
        box-shadow:0 0 8px rgba(255,255,255,.16);
    }
`

const InputSubmit = styled.button`
    height: 1.5rem;
    width: 1.5rem;
    display:block;
    background-size: cover;
    background-image: url(/static/img/loupe.svg);
    background-repeat: no-repeat;
    position:absolute;
    right:1rem;
    top:1rem;
    background-color: transparent;
    border:none;
    cursor:pointer;

    :focus{
        outline:none;
        border:none;
    }
`

const Buscar = () => {
    
    return (
        <form css={css`position:relative;`}>
            <InputText type='text' placeholder='Buscar producto'/>
            <InputSubmit/>
        </form>
    )
}

export default Buscar
