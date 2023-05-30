import {AdminLayout} from "../layouts"
import {LoginAdmin} from "../pages/admin"


const routesAdmin = [
    {
        path: "/admin",
        layout: AdminLayout,
        component: LoginAdmin,
        exact: true,
    }
];

export default routesAdmin;