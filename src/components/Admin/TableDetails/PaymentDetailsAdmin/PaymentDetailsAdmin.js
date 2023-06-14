import React from 'react'
import { Table, Button, Icon } from "semantic-ui-react"
import { usePayment } from "../../../../hooks"

import "./PaymentDetailsAdmin.scss"

export function PaymentDetailsAdmin(props) {

    const { payment, orders, openCloseModal, oReloadOrders } = props;

    const { clousePayment } = usePayment()

    const getIconPayment = (key) => {

        if (key === "CARD") {
            return "credit card outline";
        };
        if (key === "CASH") {
            return "money bill alternate outline"
        }
        return null

    };

    const onCloseTable = async () => {

        const result = window.confirm("Cerrar definitivamente la mesa?");
        if(result) {
            await clousePayment(payment.id);
        }

    }

  return (
    <div className='payment-details-admin' >
        <Table striped>
            <Table.Body>

                <Table.Row>
                    <Table.Cell>Mesa:</Table.Cell>
                    <Table.Cell>{ payment.table_data.number }</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>Total:</Table.Cell>
                    <Table.Cell>{ payment.total_payment } €</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>Forma de pago:</Table.Cell>
                    <Table.Cell>
                        <Icon name={getIconPayment(payment.payment_type)} />
                    </Table.Cell>
                </Table.Row>
                
            </Table.Body>
        </Table>

    <Button primary fluid onClick={ onCloseTable }>
        Marcar como pagado y cerrar mesa
    </Button>

    </div>
  )
}
