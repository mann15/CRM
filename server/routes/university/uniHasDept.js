import express from "express";
import {
    fetchUniHasDeptByIdController,
    addUniHasDeptController,
    deleteUniHasDeptController,
    updateUniHasDeptController,
    fetchAllUniHasDeptController
} from "../../controllers/university/uniHasDept.js";

import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id",userAccess("r"), fetchUniHasDeptByIdController);
router.post("/all", userAccess("r"),fetchAllUniHasDeptController);
router.post("/", userAccess("r-w"),addUniHasDeptController);
router.put("/", userAccess("r-w-u"),updateUniHasDeptController);
router.delete("/",userAccess("r-w-u-d"), deleteUniHasDeptController);

export default router;