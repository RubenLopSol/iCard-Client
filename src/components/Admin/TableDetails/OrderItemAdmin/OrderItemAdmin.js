import React from 'react'
import { Button, Image } from "semantic-ui-react"
import classNames from "classnames"
import moment from "moment"
import "moment/locale/es"
import "./OrderItemAdmin.scss"



export function OrderItemAdmin(props) {

  const { order } = props
  const { title, image } = order.product_data

  return (
    <div className={classNames('order-items-admin', {
      [order.status.toLowerCase()]: true, 
    } )} >

        <div className='order-items-admin__time'>
          <span>{ moment(order.created_at).format("HH:mm")}</span>{" - "}
          <span>{moment(order.created_at).startOf('seconds').fromNow()}</span>
        </div>

        <div className='order-items-admin__product'>
          <Image src={ image } />
          <p>{title}</p>

        </div>

    </div>
  )
}
