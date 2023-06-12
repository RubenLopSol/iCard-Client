import React, { useEffect } from 'react'
import { Loader } from "semantic-ui-react"
import { HeaderPage } from "../../components/Admin"
import { useTable } from "../../hooks"

export function TablesAdmin() {

  const { loading, tables, getTables } = useTable();
  
  useEffect(() => { getTables() }, []);
  
  console.log(tables);
  
  
  return (
    <>
        <HeaderPage title="Mesas" btnTitle="Añadir nueva mesa" />

        {loading ? (
          <Loader active inline="centered" >
            Cargando...
          </Loader>
        ) : (
          <h2>Listado de mesas</h2>
        )}
    </>
  )
}
