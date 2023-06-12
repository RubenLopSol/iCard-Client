import {BASE_API} from "../utils/constants"


export async function getTablesApi(token) {

    try {

        const url = `${BASE_API}/api/tables/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;

    } catch (error) {

        throw error;
    }
};