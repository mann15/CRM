import express from "express";
import {
    fetchClgEmployeeHasDesignationByIdController,
    addClgEmployeeHasDesignationController,
    deleteClgEmployeeHasDesignationController,
    updateClgEmployeeHasDesignationController,
    fetchAllClgEmployeeHasDesignationController
} from "../../controllers/college/clgEmployeeHasDesignation.js";

import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id",userAccess("r"), fetchClgEmployeeHasDesignationByIdController);
router.post("/all", userAccess("r"),fetchAllClgEmployeeHasDesignationController);
router.post("/", userAccess("r-w"),addClgEmployeeHasDesignationController);
router.put("/", userAccess("r-w-u"),updateClgEmployeeHasDesignationController);
router.delete("/",userAccess("r-w-u-d"), deleteClgEmployeeHasDesignationController);

export default router;