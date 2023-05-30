import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";
import { Error404 } from "../pages";
import {BasicLayout} from "../layouts";

const routes = [...routesAdmin,...routesClient, {
        path:"*",
        layout:BasicLayout,
        component: Error404,
    },];

export default routes;