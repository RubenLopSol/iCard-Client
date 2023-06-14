import { useState } from "react"
import { getOrderByTableApi, checkDeliveredOrderApi, addOrderToTableApi, addPaymentToOrderApi } from "../api/orders"


export function useOrder(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [orders, setOrders] = useState(null);


    const getOrdersByTable = async (idTable, status, ordering) => {

        try {

            setLoading(true);
            const response = await getOrderByTableApi( idTable, status, ordering );
            setLoading(false);
            setOrders(response);
            
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const checkDeliveredOrder = async (idOrder) => {

        try {

            await checkDeliveredOrderApi( idOrder );
            
        } catch (error) {
            
            setError(error);
        }

    }

    const addOrderToTable = async (idTable, idProduct) => {

        try {

            await addOrderToTableApi(idTable, idProduct);
            
        } catch (error) {
             setError(error);
        }
    }

    const addPaymentToOrder = async (idOrder, idPayment) => {

        try {
            
            await addPaymentToOrderApi(idOrder, idPayment);

        } catch (error) {
            
            console.log(error);
            setError(error);
        }

    }

    return {
        loading,
        error,
        orders,
        getOrdersByTable,
        checkDeliveredOrder,
        addOrderToTable,
        addPaymentToOrder,
    };
}