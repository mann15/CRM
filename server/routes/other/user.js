import express from "express";
import {
    fetchUserByIdController,
    addUserController,
    deleteUserController,
    fetchUserByNameController,
    updateUserController,
    fetchAllUserController
} from "../../controllers/other/user.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id",userAccess("r"), fetchUserByIdController);
router.post("/name", userAccess("r"),fetchUserByNameController);
router.post("/all", fetchAllUserController);
router.post("/", userAccess("r-w"),addUserController);
router.put("/",userAccess("r-w-u"), updateUserController);
router.delete("/",userAccess("r-w-u-d"), deleteUserController);

export default router;