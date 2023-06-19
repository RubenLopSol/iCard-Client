import React, { useEffect, useState } from 'react'
import { Loader } from "semantic-ui-react" 
import { useParams } from "react-router-dom"
import { forEach, size } from "lodash"
import { HeaderPage, AddOrderForm } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { ListOrderAdmin, PaymentDetailsAdmin } from "../../components/Admin/TableDetails"
import { useOrder, useTable, usePayment  } from "../../hooks"



export function TableDetailsAdmin() {

  const [reloadOrders, setReloadOrders] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const { id } = useParams();
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { table, getTable } = useTable();
  const { createPayment, getPaymentByTable } = usePayment();

  const [showModal, setShowModal] = useState(false);
  
  

  useEffect(() => {

    getOrdersByTable(id, "", "ordering=-status,created_at");
   
  }, [reloadOrders, id]);



  useEffect(() => {
    getTable(id);
  }, [id])


  useEffect(() => {
    (async() =>{
       const response = await getPaymentByTable(id);
       if (size(response) > 0) setPaymentData(response[0]);      
    })();
  }, [reloadOrders])

  
  


  const onReloadOrders = () => setReloadOrders((prev) => !prev);

  const openCloseModal = () => setShowModal((prev) => !prev);


  const onCreatedPayment = async () => {
    const result = window.confirm('Generar cuenta mesa?');

    if (result) {

      let totalPayment = 0;
      forEach(orders, (order) => {
        totalPayment += Number(order.product_data.price)
      });

      const resultTypePayment = window.confirm('Efectivo = CANCELAR             Tarjeta = ACEPTAR');
      const paymentData = {
        table: id,
        total_payment: totalPayment.toFixed(2),
        payment_type: resultTypePayment ? "CARD" : "CASH",
        status_payment: "PENDING",
      };
      

      const payment = await createPayment(paymentData);
      
      for await (const order of orders) {

        await addPaymentToOrder(order.id, payment.id);
      };
      onReloadOrders();
    }
  }
  
  return (
    <>
    <HeaderPage 
    title={`Mesa ${table?.number ||  "" }`} 
    btnTitle={paymentData ? "Ver cuenta" : "Añadir pedido"} 
    btnClick={openCloseModal}
    btnTitleTwo={!paymentData  ? "Generar cuenta" : null}
    btnClickTwo={onCreatedPayment}
    />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}

      <ModalBasic show={showModal} onclose={openCloseModal} title="Nuevo pedido"  >
        {paymentData ? (
          <PaymentDetailsAdmin 
          payment={paymentData} 
          orders={orders} 
          openCloseModal={openCloseModal} 
          onReloadOrders={onReloadOrders}
          
          />
        ) : (
        <AddOrderForm 
        idTable={id} 
        openCloseModal={openCloseModal} 
        onReloadOrders={onReloadOrders} 
        />
        )}

      </ModalBasic>


    </>
  )
}
