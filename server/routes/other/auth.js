import express from "express";
import {
    loginController,
    changePasswordController,
    logoutController,
    getProfileController
} from "../../controllers/other/auth.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/changePassword", changePasswordController);
router.post("/logout", logoutController);
router.post("/getProfile", loggedIn, getProfileController);

export default router;