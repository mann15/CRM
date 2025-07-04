import express from "express";
import {
    fetchIndCmpHasIndCmpDeptByIdController,
    addIndCmpHasIndCmpDeptController,
    deleteIndCmpHasIndCmpDeptController,
    updateIndCmpHasIndCmpDeptController,
    fetchAllIndCmpHasIndCmpDeptController
} from "../../controllers/industry/indCmpHasIndCmpDept.js";

import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id",userAccess("r"), fetchIndCmpHasIndCmpDeptByIdController);
router.post("/all", userAccess("r"),fetchAllIndCmpHasIndCmpDeptController);
router.post("/", userAccess("r-w"),addIndCmpHasIndCmpDeptController);
router.put("/", userAccess("r-w-u"),updateIndCmpHasIndCmpDeptController);
router.delete("/",userAccess("r-w-u-d"), deleteIndCmpHasIndCmpDeptController);

export default router;