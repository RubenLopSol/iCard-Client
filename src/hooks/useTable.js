import {useState} from "react"
import {getTablesApi, addTableApi} from "../api/table"
import {useAuth} from "./useAuth"


export function useTable() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tables, setTables] = useState(null);

    const { auth } = useAuth();


    const getTables = async () => {

        try {

            setLoading(true);
            const response = await getTablesApi(auth.token);
            setLoading(false);
            setTables(response);

        } catch (error) {

            setLoading(false);
            setError(error);
            
        }
    };

    const addTable = async (data) => {
        try {

            setLoading(true);
            await addTableApi(data, auth.token);
            setLoading(false);
                       
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    return{
        loading,
        error,
        tables,
        getTables,
        addTable
    }

}

