import React, { useEffect } from 'react'
import { Loader } from "semantic-ui-react"
import { HeaderPage, TableListAdmin } from "../../components/Admin"
import { useTable } from "../../hooks"


export function OrdersAdmin() {
  
  const { loading, tables, getTables } = useTable();
  
  useEffect(() => {
    async function fetchData() {
      await getTables();
    }
    fetchData();
  }, []);

  

  return (
    <>
        
        <HeaderPage title="Restaurante" />
        {loading ? (
          <Loader active inline="centered">
            Cargabdo...
          </Loader>
        ) : (
          <TableListAdmin tables={tables}/>
        )}
        
    </>
  )
}
