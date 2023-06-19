import {ClientLayout, BasicLayout} from "../layouts"
import { SelectTable } from "../pages/client/SelectTable"



const routesClient= [
    {
        path: "/",
        layout: BasicLayout,
        component: SelectTable,
        exact: true,
    },

];

export default routesClient;