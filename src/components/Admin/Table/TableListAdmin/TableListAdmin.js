import React from 'react'
import { map } from "lodash"
import { TableAdmin } from "../."
import "./TableListAdmin.scss"

export function TableListAdmin(props) {

    const { tables } = props;

  return (
    <div className='table-list-admin'>

        {map(tables, (table, index) => (
            <TableAdmin key={index} table={table} />
        ))}
        
    </div>
  )
}
