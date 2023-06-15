import React, { useState, useEffect } from 'react'

import "./PaymentProductList.scss"
import { useOrder } from "../../../../hooks"



export function PaymentProductList(props) {

    const { payment } = props;
    const { getOrdersByPayment } = useOrder()

    const [orders, setOrders] = useState(undefined);


    useEffect(() => {
      (async () =>{
        const response = await getOrdersByPayment(payment.id);
        setOrders(response);
      })()
    }, [])
    


  return (
    <div>
        <h2>PaymentProductList</h2>
    </div>
  )
}
