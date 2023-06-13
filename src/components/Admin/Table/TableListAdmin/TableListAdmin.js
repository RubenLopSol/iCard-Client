import React from 'react'
import { Button, Icon, Checkbox } from "semantic-ui-react"
import { map } from "lodash"
import { TableAdmin } from "../."
import "./TableListAdmin.scss"

export function TableListAdmin(props) {

    const { tables } = props;

  return (
    <div className='table-list-admin'>

        <Button primary icon className='table-list-admin__reload' onClick={() => console.log('onRefreshReload')} >
            <Icon name="refresh" />
        </Button>

        <div className='table-list-admin__reload-toggle'> 

            <span>Reload automatico</span>

            <Checkbox toggle onChange={(_,data) => console.log(data.checked)} />
            
        </div>

        {map(tables, (table, index) => (
            <TableAdmin key={index} table={table} />
        ))}
        
    </div>
  )
}
