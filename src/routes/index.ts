import {Router} from "express";

import authRoutes from "./auth/authRoutes";
import userRoutes from "./user/userRoutes";
import orderRoutes from "./order/orderRoutes";
import collectorOrgRoutes from "./collectorOrg/collectorOrgRoutes";
//import resourceRoutes from "./collectorOrg/resource/resourceRoutes";
import productRoutes from "./product/productRoutes";
import routeRoutes from "./route/routeRoutes";

const router = Router();

export default (): Router => {
    authRoutes(router);
    userRoutes(router);
    orderRoutes(router);
    collectorOrgRoutes(router);
    //resourceRoutes(router);
    productRoutes(router);
    routeRoutes(router);
    
    return router;
}