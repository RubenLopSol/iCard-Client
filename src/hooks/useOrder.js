import { useState } from "react"
import { getOrderByTableApi } from "../api/orders"


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
    return {
        loading,
        error,
        orders,
        getOrdersByTable
    }
}