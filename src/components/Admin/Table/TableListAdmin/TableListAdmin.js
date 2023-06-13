import React, {useState, useEffect} from 'react'
import { Button, Icon, Checkbox } from "semantic-ui-react"
import { map } from "lodash"
import { TableAdmin } from "../."
import "./TableListAdmin.scss"

export function TableListAdmin(props) {

    const { tables } = props;
    const [reload, setReload] = useState(false);
    const [autoReload, setAutoReload] = useState(false)

    const onReload = () => setReload((prev) => !prev);


    useEffect(() => {
      if(autoReload) {
        const autoReloadAction = () => {
            onReload()

            setTimeout(() => {
                autoReloadAction();
                
            }, 10000);
        };
        autoReloadAction();
      }
    }, [autoReload]);

    const onCheckAutoReload = (check) => {
        if(check){
            setAutoReload(check)
        }else {
            window.location.reload();
        }
    }
    


  return (
    <div className='table-list-admin'>

        <Button primary icon className='table-list-admin__reload' onClick={onReload} >
            <Icon name="refresh" />
        </Button>

        <div className='table-list-admin__reload-toggle'> 

            <span>Reload automático</span>

            <Checkbox toggle checked={autoReload} onChange={(_,data) => onCheckAutoReload(data.checked)} />
            
        </div>

        {map(tables, (table, index) => (
            <TableAdmin key={index} table={table} reload={reload} />
        ))}
        
    </div>
  )
}
