import {ClientLayout} from "../layouts"
import {home} from "../pages/client"
import {Error404} from "../pages"


const routesClient= [
    {
        path: "/",
        layout: ClientLayout,
        component: home,
        exact: true,
    }

];

export default routesClient;