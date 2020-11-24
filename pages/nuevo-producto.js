import React, {useState, useContext} from 'react';
import Router, {useRouter} from 'next/router';
import FileUploader from "react-firebase-file-uploader";
import Layout from '../components/layout/Layout';
import { Form, Campo, InputSubmit, Error } from '../components/ui/Form';

import {FirebaseContext} from '../firebase';

import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

const ESTATE_INICIAL = {
    nombre: '',
    empresa: '',
    imagen: '',
    url: '',
    descripcion: ''
} 

const NuevoProducto = () => {

    const [nombreimagen, guardarNombre]  = useState('')
    const [subiendo, guardarSubiendo] = useState(false)
    const [progreso, guardarProgreso] = useState(0)
    const [urlimagen, guardarUrlImagen] = useState('')

    const [error, setError] = useState(false)

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(ESTATE_INICIAL, validarCrearProducto, crearProducto);

    const {nombre, empresa, imagen, url, descripcion} = valores;

    const router = useRouter();

    const { usuario, firebase } = useContext(FirebaseContext)

    async function crearProducto(){

        if(!usuario){
            return router.push('/login')
        }

        const producto = {
            nombre,
            empresa,
            url,
            urlimagen,
            descripcion,
            votos:0,
            comentarios: [],
            creado: Date.now()
        }

        console.log(producto)
        console.log(producto.urlimagen)

        if(producto.urlimagen !== undefined){
            firebase.db.collection('productos').add(producto)
        }

        // return router.push('/')
    }

    const handleUploadStart = () => {
        console.log('handleUploadStart')


        guardarProgreso(0);
        guardarSubiendo(true);
    }
    
    const handleProgress = progreso => {
        console.log('handleProgress')


        guardarProgreso({ progreso })
    };
    
    const handleUploadError = error => {
        console.log('handleUploadError')


        guardarSubiendo(error);
        console.error(error);
        console.log('error')
    };
    
    const handleUploadSuccess = nombre => {
        console.log('handleUploadSuccess')


        console.log('nombre: ', nombre)
        guardarProgreso(100);
        guardarSubiendo(false);
        guardarNombre(nombre)
        firebase.storage().ref("productos").child(nombre).getDownloadURL().then(url => {
            console.log('.then')
              console.log(url);
              console.log('urlImagen: ', urlImagen)
              guardarUrlImagen(url);
              console.log('urlImagen: ', urlImagen)
            } );
    };

    return (
        <Layout>
            <h1 css={{textAlign:'center'}}>Crea un nuevo producto</h1>
            <Form
                onSubmit={handleSubmit}
                noValidate
            >
                <Campo>
                    <label htmlFor='nombre'>Nombre</label>
                    <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={nombre}
                        type='text'
                        id='nombre'
                        name='nombre'
                        placeholder='Tu nombre'/>
                </Campo>
                
                {errores.nombre && <Error>{errores.nombre}</Error>}


                <Campo>
                    <label htmlFor='empresa'>Empresa</label>
                    <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={empresa}
                        type='text'
                        id='empresa'
                        name='empresa'
                        placeholder='Empresa o compañia'/>
                </Campo>
                
                {errores.empresa && <Error>{errores.empresa}</Error>}


                <Campo>
                    <label htmlFor='imagen'>Imagen</label>
                    <FileUploader 
                        accept="image/*"
                        id="imagen"
                        name="imagen"
                        randomizeFilename
                        storageRef={firebase.storage.ref("productos")}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                    />
                </Campo>

                <Campo>
                    <label htmlFor='url'>Url</label>
                    <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={url}
                        type='url'
                        id='url'
                        name='url'
                        placeholder='URL de tu producto'/>
                </Campo>
                
                {errores.url && <Error>{errores.url}</Error>}

                <Campo>
                    <label htmlFor='descripcion'>Descripcion</label>
                    <textarea
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={descripcion}
                        id='descripcion'
                        name='descripcion'
                        placeholder='Agrega una descripcion de tu producto'/>
                </Campo>
                
                {errores.descripcion && <Error>{errores.descripcion}</Error>}

                

                {error && <Error>{error}</Error>}

                <InputSubmit type='submit' value='Crear producto'/>
            </Form>
        </Layout>
    )
}

export default NuevoProducto
