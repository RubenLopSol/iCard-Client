import React, { useState, useEffect } from 'react'
import { Label } from "semantic-ui-react"
import { size } from "lodash"
import classNames from "classnames"
import { Link } from "react-router-dom"
import { getOrderByTableApi } from "../../../../api/orders"
import {ORDER_STATUS} from "../../../../utils/constants"
import { ReactComponent as IcTable } from "../../../../assets/sillas-mesa.svg"

import "./TableAdmin.scss"


export function TableAdmin(props) {

  const { table } = props;
  const [orders, setOrders] = useState([]);
  const [tableBusy, setTableBusy] = useState(false)

  useEffect(() => {
    
    (async () => {

      const response = await getOrderByTableApi(table.id, ORDER_STATUS.PENDING);

      setOrders(response);

    })();
  
    
  }, [])

  useEffect(() => {
    
    (async () => {

      const response = await getOrderByTableApi(table.id, ORDER_STATUS.DELIVERED);

      if(size(response) > 0) setTableBusy(response)
      else setTableBusy(false);

    })(); 
  }, [])
  

  return (

    <Link className='table-admin' to={`/admin/table/${table.id}`}>

    {size(orders) > 0 ? (
      <Label circular color='blue' >
        {size(orders)}
      </Label>
    ) : null }
        
    <IcTable className={classNames({
      pending: size(orders) > 0,
      busy: tableBusy,
    })} />


    <p>Mesa {table.number}</p>


    </Link>
  )
}
