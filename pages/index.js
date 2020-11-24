import React, {useState, useEffect, useContext} from 'react';
import Layout from '../components/layout/Layout'
import {FirebaseContext} from '../firebase'
import styled from '@emotion/styled'

import CardProduct from '../components/layout/CardProduct'

const CardContainer = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
`

export default function Home() {

  const [productos, setProductos] = useState([])

  const {firebase} = useContext(FirebaseContext)
 
  useEffect(()=> {
    const obtenerProductos = () => {
      firebase.db.collection('productos').orderBy('creado', 'desc').onSnapshot(manejarSnapshot)
    }
    obtenerProductos()
  }, [])

  function manejarSnapshot(snapshot) {
    const productos = snapshot.docs.map(doc => {
      return {
        id:doc.id,
        ...doc.data()
      }
    })

    setProductos(productos)
  }

  return (
    <div>
      <Layout>
        <CardContainer>
          {productos.map((producto) => {
            return <CardProduct key={producto.id} producto={producto}/>
          })}
        </CardContainer>
      </Layout>
    </div>
  )
}
