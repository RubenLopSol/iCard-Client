import React, { useState, useEffect } from 'react'
import { Loader } from "semantic-ui-react"
import { HeaderPage, TableTablesAdmin, AddEditTableForm  } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { useTable } from "../../hooks"

export function TablesAdmin() {

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setrefetch] = useState(false);
  const { loading, tables, getTables } = useTable();
  
  useEffect(() => { getTables() }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setrefetch((prev) => !prev)

  const addTable = () => {
    setTitleModal("Crear mesa");
    setContentModal( <AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} /> )
    openCloseModal();
  }
  
  
  
  
  return (
    <>
        <HeaderPage title="Mesas" btnTitle="Añadir nueva mesa" btnClick={addTable} />

        {loading ? (
          <Loader active inline="centered" >
            Cargando...
          </Loader>
        ) : (
          <TableTablesAdmin tables={tables} />
        )}

        <ModalBasic 
        show={showModal} 
        onClose={openCloseModal} 
        title={titleModal} 
        children={contentModal} 

        />
    </>
  )
}
