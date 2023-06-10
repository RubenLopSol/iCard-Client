import React, {useEffect} from 'react'
import { Loader } from "semantic-ui-react"
import {HeaderPage} from '../../components/Admin'
import {useProduct} from "../../hooks"

export function ProductAdmin() {

    const { loading, products, getProducts } = useProduct();

    useEffect(() => {
        const fetchData = async () => {
          try {
            await getProducts();
          } catch (error) {
            throw error;
          }
        };

        fetchData();
    }, []);

    
  return (
    <>

    <HeaderPage title= 'Productos' btnTitle= 'Nuevo producto'  />

    {loading ? (
        <Loader active inline='centered'>
            Cargando...
        </Loader>
    ) : (
        <p>Products Table</p>
    )}



    </>
  )
}
