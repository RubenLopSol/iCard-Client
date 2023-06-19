import React, { useState, useEffect } from 'react'
import { map } from "lodash"
import { Image } from "semantic-ui-react"

import "./PaymentProductList.scss"
import { useOrder } from "../../../../hooks"



export function PaymentProductList(props) {

    const { payment } = props;
    const { getOrdersByPayment } = useOrder()

    const [orders, setOrders] = useState([]);


    useEffect(() => {
      (async () =>{
        const response = await getOrdersByPayment(payment.id);
        setOrders(response);
      })()
    }, [getOrdersByPayment, payment.id])
    


  return (
    <div className='payment-product-list' >

        {map(orders, (order) => (
            <div className='payment-product-list__product' key={order.id} >
                <div>
                    <Image src={ order.product_data.image } avatar size='tiny' />
                    <span>{ order.product_data.title }</span>
                </div>
                <span>{ order.product_data.price } €</span>
            </div>
        ))}
        
    </div>
  )
}
