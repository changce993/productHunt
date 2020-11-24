import React, {useState} from 'react';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import { Form, Campo, InputSubmit, Error } from '../components/ui/Form';

import firebase from '../firebase';

import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta'; 

const ESTATE_INICIAL = {
    nombre: '',
    email: '',
    password: ''
}

const CrearCuenta = () => {

    const [error, setError] = useState(false)

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(ESTATE_INICIAL, validarCrearCuenta, crearCuenta);

    const {nombre, email, password} = valores;

    async function crearCuenta(){
        try {
            await firebase.registrar(nombre, email, password)
            Router.push('/')
        } catch (error) {
            console.error('Hubo un error al crear el uruaio ', error.message)
            setError(error.message)
        }
    }

    return (
        <Layout>
            <h1 css={{textAlign:'center'}}>Crea una cuenta</h1>
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
                        placeholder='nombre'/>
                </Campo>
                
                {errores.nombre && <Error>{errores.nombre}</Error>}

                <Campo>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={email}
                        type='email'
                        id='email'
                        name='email'
                        placeholder='email'/>
                </Campo>

                {errores.email && <Error>{errores.email}</Error>}

                <Campo>
                    <label htmlFor='password'>password</label>
                    <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={password}
                        type='password'
                        id='password'
                        name='password'
                        placeholder='password'/>
                </Campo>

                {errores.password && <Error>{errores.password}</Error>}
                {error && <Error>{error}</Error>}

                <InputSubmit type='submit' value='Crear cuenta'/>
            </Form>
        </Layout>
    )
}

export default CrearCuenta
