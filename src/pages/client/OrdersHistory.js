import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { map, size, forEach } from "lodash";
import { useOrder, useTable, usePayment } from "../../hooks";
import { OrderHistoryItem } from "../../components/Client";
import { ModalConfirm } from "../../components/Common";




export function OrdersHistory() {

  const [showTypePayment, setShowTypePayment] = useState(false)
  const [idTable, setIdTable] = useState(null)

  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { getTableByNumber } = useTable();
  const { createPayment } = usePayment();
  const { tableNumber } = useParams();

  useEffect(() => {
    (async () => {
      const table = await getTableByNumber(tableNumber);
      const idTableTemp = table[0].id;
      setIdTable(idTableTemp);

      getOrdersByTable(idTableTemp, "", "ordering=-status, -created_at");
    })()
  }, []);

  const onCreatePayment = async (paymentType) => {

    setShowTypePayment(false);

    let totalPayment = 0;
    forEach(orders, (order) =>{
      totalPayment += Number(order.product_data.price)
    })

    const paymentData = {
      table: idTable,
      total_payment: totalPayment.toFixed(2),
      payment_type: paymentType,
      status_payment: "PENDING",
    };

    const payment = await createPayment(paymentData);

    for await (const order of orders) {
      await addPaymentToOrder( order.id, payment.id );
    }
    window.location.reload();
  }


  return (
    <div>
        <h1>Historial de pedidos</h1>
        {loading ? (
          <p>Cargando</p>
        ) : (
          <>

            {size(orders) > 0 && (
                <Button primary fluid onClick={() => setShowTypePayment(true)}>
                  Pedir la cuenta
                </Button>
            )}

            {map(orders, (order) => (
                <OrderHistoryItem key={order.id} order={order} />
            ))}
          </>
        )}

        <ModalConfirm 
        title="Pagar con tarjeta o efectivo?" 
        show={showTypePayment}
        onCloseText="Efectivo"
        onClose={ () => onCreatePayment("CASH")}
        onConfirmText="Tarjeta"
        onConfirm={() => onCreatePayment("CARD")}
        />
      
    </div>
  )
};
