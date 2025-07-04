import express from "express";
import {
    fetchClgHasDeptByIdController,
    addClgHasDeptController,
    deleteClgHasDeptController,
    updateClgHasDeptController,
    fetchAllClgHasDeptController
} from "../../controllers/college/clgHasDept.js";

import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id",userAccess("r"), fetchClgHasDeptByIdController);
router.post("/all", userAccess("r"),fetchAllClgHasDeptController);
router.post("/", userAccess("r-w"),addClgHasDeptController);
router.put("/", userAccess("r-w-u"),updateClgHasDeptController);
router.delete("/",userAccess("r-w-u-d"), deleteClgHasDeptController);

export default router;