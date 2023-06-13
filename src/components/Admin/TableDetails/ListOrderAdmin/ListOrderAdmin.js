import React from 'react'
import { map } from "lodash"
import { OrderItemAdmin } from "../"
import "./ListOrderAdmin.scss"



export function ListOrderAdmin(props) {

  const { orders } = props;

  return (
    <div className='list-order-admin'>

      {map(orders, (order) => (

        <OrderItemAdmin key={order.id} order={order} />

      ))}

    </div>
  )
}
