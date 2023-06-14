import React, { useEffect, useState } from 'react'
import { Loader } from "semantic-ui-react" 
import { useParams } from "react-router-dom"
import { HeaderPage, AddOrderForm } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { ListOrderAdmin } from "../../components/Admin/TableDetails"
import { useOrder, useTable } from "../../hooks"

export function TableDetailsAdmin() {

  const [reloadOrders, setReloadOrders] = useState(false);
  const { id } = useParams();
  const { loading, orders, getOrdersByTable } = useOrder();
  const { table, getTable } = useTable();

  const [showModal, setshowModal] = useState(false);
  
  

  useEffect(() => {

    getOrdersByTable(id, "", "ordering=-status,created_at");
   
  }, [reloadOrders, id]);



  useEffect(() => {
    getTable(id);
  }, [id])
  


  const onReloadOrders = () => setReloadOrders((prev) => !prev);

  const openCloseModal = () => setshowModal((prev) => !prev);
  

  return (
    <>
    <HeaderPage 
    title={`Mesa ${table?.number ||  "" }`} 
    btnTitle="Añadir pedido" 
    btnClick={openCloseModal}

    />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}

      <ModalBasic show={showModal} onclose={openCloseModal} title="Nuevo pedido"  >
        <AddOrderForm idTable={id} openCloseModal={openCloseModal} />
      </ModalBasic>


    </>
  )
}
