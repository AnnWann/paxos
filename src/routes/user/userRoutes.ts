import {Router} from "express";
import {deleteUser, getUserBySessionToken, getUserData, getUsers, updateUserData} from "../../controllers/user/userController";

export default (router: Router) => {
    router.get("/user/:id", getUserData);
    router.get("/user/by-session/:sessionToken", getUserBySessionToken)
    router.get("/user", getUsers);
    router.put("/user", updateUserData);
    router.delete("/user/:id", deleteUser);
}