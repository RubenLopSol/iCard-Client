import React from 'react'

import { ReactComponent as IcTable } from "../../../../assets/sillas-mesa.svg"
import "./TableAdmin.scss"

export function TableAdmin(props) {

  const { table } = props;

  return (

    <div className='table-admin'>
        
    <IcTable />
    <p>Mesa {table.number}</p>


    </div>
  )
}
