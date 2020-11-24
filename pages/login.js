import React, {useState} from 'react';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import { Form, Campo, InputSubmit, Error } from '../components/ui/Form';

import firebase from '../firebase';

import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const ESTATE_INICIAL = {
    email: '',
    password: ''
}

const Login = () => {

    const [error, setError] = useState(false)

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(ESTATE_INICIAL, validarIniciarSesion, iniciarSesion);

    const {email, password} = valores;

    async function iniciarSesion() {
        try {
            await firebase.login(email, password);
            Router.push('/')
        } catch (error) {
            console.error('Hubo un error al autenticar el uruaio ', error.message)
            setError(error.message)
        }
    }

    return (
        <Layout>
            <h1 css={{textAlign:'center'}}>Iniciar Sesión</h1>
            <Form
                onSubmit={handleSubmit}
                noValidate
            >
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

                <InputSubmit type='submit' value='Iniciar sesión'/>
            </Form>
        </Layout>
    )
}

export default Login
