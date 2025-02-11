import {Router} from "express";
import clientRoutes from "./clientRoutes/clientRoutes";
import serverRoutes from "./serverRoutes/serverRoutes";

const router = Router();

export default (): Router => {
    clientRoutes(router);
    serverRoutes(router);
    return router;
}