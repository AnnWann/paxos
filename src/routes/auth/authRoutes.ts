import {Router} from "express";
import {login, signup} from "../../controllers/auth/authController";

export default (router: Router) => {
    router.post("/auth/signup", signup);
    router.post("/auth/login", login);
}