import {ClientLayout, BasicLayout} from "../layouts"
import { SelectTable, Categories, Products  } from "../pages"



const routesClient= [
    {
        path: "/",
        layout: BasicLayout,
        component: SelectTable,
        exact: true,
    },
    {
        path: "/client/:tableNumber",
        layout: ClientLayout,
        component: Categories,
        exact: true,
    },
    {
        path: "/client/:tableNumber/:idCategory",
        layout: ClientLayout,
        component: Products,
        exact: true,
    },

];

export default routesClient;