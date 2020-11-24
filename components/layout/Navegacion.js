import React, {useContext} from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import {FirebaseContext} from '../../firebase'

const Nav = styled.nav`
    padding-left:2rem;

    a{
        font-size: size 1.8rem;
        margin-left:2rem;
        color:white;
        transition:.3s;
        position:relative;

        ::before{
            content:'';
            width:0;
            height:2px;
            background: var(--primary);
            position:absolute;
            bottom:-.5rem;
            left:-.5rem;
            transition:.3s;
        }

        :hover{
            color:var(--primary);

            ::before{
                width:calc(100% + 1rem);
            }
        }

        :last-of-type{
            margin-right:0;
        }
    }
`

const Navegacion = () => {

    const {usuario} = useContext(FirebaseContext)

    return (
        <Nav>
            <Link href='/'>Inicio</Link>
            <Link href='/populares'>Populares</Link>
            {usuario && <Link href='/nuevo-producto'>Nuevo producto</Link>}
        </Nav>
    )
}

export default Navegacion
