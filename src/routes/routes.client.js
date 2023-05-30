import {ClientLayout} from "../layouts"
import {home} from "../pages/client"



const routesClient= [
    {
        path: "/",
        layout: ClientLayout,
        component: home,
        exact: true,
    },

];

export default routesClient;