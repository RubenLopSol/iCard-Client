import React, { useEffect } from 'react'
import { Loader } from "semantic-ui-react" 
import { useParams } from "react-router-dom"
import { HeaderPage } from "../../components/Admin"
import { useOrder } from "../../hooks"

export function TableDetailsAdmin() {

  const { id } = useParams();
  const { loading, orders, getOrdersByTable } = useOrder();

  useEffect(() => {

    getOrdersByTable(id);
   
  }, [])

  

  return (
    <>
    <HeaderPage title={`Mesa ****`} />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <h2>Lista de pedidos</h2>
      )}
    </>
  )
}
