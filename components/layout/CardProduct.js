import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {es} from 'date-fns/locale'
import Link from 'next/link'
import styled from '@emotion/styled'

const Card = styled.div`
    background: var(--blackContainer);
    border-radius:1rem;
    width:24%;
    margin-bottom:2rem;
    overflow:hidden;

    .data{
        padding:1rem 2rem;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
    }
`

const Image = styled.img`
    width:100%;
    height:20rem;
    object-fit:cover;
    cursor:pointer;
`

const Flex = styled.div`
    display:flex;
    justify-content:space-between;

    .title{
        width:70%;
    }
`

const CardProduct = ({producto}) => {

    const {id, comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos} = producto;

    return (
        <Card>

            <Link href='/productos/[id]' as={`/productos/${id}`}>
                <Image src={urlimagen}/>
            </Link>
            <div className='data'>
                <div>
                    <Flex>
                        <p className='title'>{nombre}</p>
                        <p>{formatDistanceToNow(new Date(creado), { locale: es })}</p>
                    </Flex>
                    <p>{descripcion.substr(0,60)}{descripcion.substr(0,60).length < 60 ? null : '...'}</p>
                </div>

                <Flex>
                    <p>{comentarios.length <= 0 ? '0 Comentarios' : comentarios}</p>
                    <p>{votos} Votos</p>
                </Flex>
            </div>
        </Card>
    )
}

export default CardProduct
