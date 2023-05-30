import routesAdmin from "./routes.admin"
import routesClient from "./routes.client"

const routes = [
    ...routesAdmin,
    ...routesClient
];

export default routes;