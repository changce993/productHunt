import React from 'react'
import Header from './Header'
import { Global, css } from '@emotion/react';
import Head from 'next/head'
import Container from '../ui/Container'

const Layout = props => {
    return (
        <>
            <Global
                styles={css`
                    :root {
                        --gris1:#F8F9FC;
                        --gris2:#CCCCCC;
                        --primary:#FF4F00;
                        --secondary:#009FFF;
                        --black:#070D10;
                        --blackContainer:#161819;
                    }

                    html {
                        font-size:62.5%;
                        box-sizing:border-box;
                    }

                    *, *::before, *::after{
                        box-sizing:inherit;
                        font-family: 'Ubuntu', sans-serif;
                    }

                    body {
                        font-size:1.5rem;
                        line-height:1.5;
                        color:white;
                        background-color: var(--black);
                    }

                    h1,h2,h3 {
                        margin:0 0 2rem 0;
                        line-height:1.5;
                    }

                    ul{
                        list-style:none;
                        padding:0;
                        margin:0;
                    }

                    a{
                        text-decoration:none;
                    }
                `}
            />

            <Head>
                <html lang='es' />
                <title>Product Hunt con Next.js y Firebase</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://fonts.gstatic.com"/> 
                <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap" rel="stylesheet"/>
                <link href='/static/css/app.css' rel='stylesheet'/>
                <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
                <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"/>
            </Head>

            <Header/>
            
            <main>
            {/* <main data-aos='fade-up'> */}
                <Container>
                    {props.children}
                </Container>
            </main>

            <script>AOS.init()</script>
        </>
    )
}

export default Layout
