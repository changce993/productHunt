import React, {useContext} from 'react'
import Buscar from '../ui/Buscar'
import Navegacion from './Navegacion'
import Link from 'next/link'
import styled from '@emotion/styled'
import Button from '../ui/Button'
import {FirebaseContext} from '../../firebase'

const ContenedorHeader = styled.div`
    max-width:1920px;
    width:95%;
    margin:0 auto;

    @media(min-width: 768px){
        display:flex;
        justify-content:space-between;
    }
`

const Logo = styled.p`
    color:var(--primary);
    font-size:4rem;
    line-height:0;
    font-weight: 700;
    margin-right:2rem;
`

const Header = () => {

    const {usuario, firebase} = useContext(FirebaseContext)

    const anchorStyles = {
        marginLeft:'1rem',
        padding:'.5rem 1rem'
    }

    return (
        <header
            // data-aos='fade-down'
            css={{
                borderBottom:'1px solid var(--gris)',
                padding:'1rem 0' 
            }}
        >
            <ContenedorHeader>
                <div css={{
                    display:'flex',
                    alignItems:'center'
                }}>
                    <Logo>
                        <Link href='/'>
                            P
                        </Link>
                    </Logo>
                    
                    <Buscar/>
                    <Navegacion/>
                </div>

                <div
                    css={{
                        display:'flex',
                        alignItems:'center'
                    }}>
                    {usuario ? (
                        <>
                            <p css={{marginRight:'2rem'}}>Hola: {usuario.displayName}</p>
                            <Button
                                type='button'
                                onClick={() => firebase.cerrarSesion()}
                            >Cerrar Sesión</Button>
                        </>
                    ) : (
                        <>
                            <p css={anchorStyles}><Link href='/login'>Ingresar</Link></p>
                            <p css={anchorStyles}><Link href='/crear-cuenta'>Registrate</Link></p>
                        </>
                    )}
                </div>
            </ContenedorHeader>
        </header>
    )
}

export default Header


                    
                    