import express from "express";
import {
    fetchUniEmployeeHasDesignationByIdController,
    addUniEmployeeHasDesignationController,
    deleteUniEmployeeHasDesignationController,
    updateUniEmployeeHasDesignationController,
    fetchAllUniEmployeeHasDesignationController
} from "../../controllers/university/uniEmployeeHasDesignation.js";

import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id",userAccess("r"), fetchUniEmployeeHasDesignationByIdController);
router.post("/all", userAccess("r"),fetchAllUniEmployeeHasDesignationController);
router.post("/", userAccess("r-w"),addUniEmployeeHasDesignationController);
router.put("/", userAccess("r-w-u"),updateUniEmployeeHasDesignationController);
router.delete("/",userAccess("r-w-u-d"), deleteUniEmployeeHasDesignationController);

export default router;