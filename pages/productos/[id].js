import React, {useEffect, useContext, useState} from 'react'
import {useRouter} from 'next/router'
import { FirebaseContext } from '../../firebase'
import Layout from '../../components/layout/Layout'
import Error404 from '../../components/layout/404'
import { Campo, InputSubmit } from '../../components/ui/Form'
import Button from '../../components/ui/Button';
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Header = styled.div`
    max-width:1920px;
    margin:0 auto;


    .flex{
        height:30rem;
        display:flex;
        justify-content:space-between;
        align-items:flex-end;
    }

    img{
        width:100%;
        position:absolute;
        left:0;
        top:0;
        z-index:-10;
        height:40rem;
        object-fit:cover;
        filter: brightness(.3);
    }

    .header-data{
        margin-left:1rem;
    }
`

const MainContainer = styled.div`
    display:flex;
    margin:5rem 0;

    .left{
        width:40%;
    }

    .right{
        width:55%;
        margin-left:5%;
        display:flex;
        justify-content:space-between;
        align-items:center;

        div.votos{
            display:flex;
            justify-content:space-between;
            align-items:center;

            p{
                margin-right:2rem;
            }
        }
    }
`

const Producto = () => {

    const [producto, guardarProducto] = useState({})
    const [error, guardarError] = useState(false)

    const router = useRouter()
    const {query:{id}} = router

    const {firebase} = useContext(FirebaseContext)

    let {comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos} = producto;
    if(comentarios === undefined) comentarios = [];

    useEffect(() => {
        if(id){
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id)
                const producto = await productoQuery.get()
                guardarProducto(producto.data())
                if(producto.exists){
                    guardarProducto(producto.data())
                } else {
                    guardarError(true)
                }
            }
            obtenerProducto()
        }
    }, [id])

    return (
        <Layout>
            {error && <Error404/>}
            <Header>
                <img src={urlimagen}/>

                <div className='flex'>
                    <h1>{nombre}</h1>
                    <div className='flex'>
                        <p className='header-data'>{votos} votos</p>
                        <p className='header-data'>{comentarios ? '0 Comentarios' : comentarios}</p>
                        {comentarios}
                        <p className='header-data'>{creado}</p>
                    </div>
                </div>
            </Header>

            <MainContainer>

                <div className='left'>
                    <h2>Agrega un comentario</h2>
                    <form>
                        <Campo>
                            <input
                                placeholder='Comentario'
                                type='text'
                                name='mensaje'
                            />
                        </Campo>

                        <InputSubmit type='submit' value='Agregar comentario'/>
                    </form>

                    <h2 css={ css`margin-top:5rem;`} >Comentarios</h2>

                    {comentarios.map((comentario) => (
                        <li>
                            <p>{comentario.nombre}</p>
                            <p>Escrito por: {comentario.usuarioNombre}</p>
                        </li>
                    ))}
                </div>

                <div className='right'>
                    <Button
                        target='_blank'
                        href={url}
                    >
                        Visitar url
                    </Button>

                    <div className='votos'>
                        <p>{votos} votos</p>
                        <Button>Votar</Button>
                    </div>
                </div>
            </MainContainer>
        </Layout>
    )
}

export default Producto;
