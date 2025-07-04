import express from "express";
import {
    fetchTypeByIdController,
    addTypeController,
    deleteTypeController,
    fetchTypeByNameController,
    updateTypeController,
    fetchAllTypeController
} from "../../controllers/common/type.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id", userAccess("r"),fetchTypeByIdController);
router.post("/name", userAccess("r"),fetchTypeByNameController);
router.post("/all", userAccess("r"),fetchAllTypeController);
router.post("/", userAccess("r-w"),addTypeController);
router.put("/", userAccess("r-w-u"),updateTypeController);
router.delete("/", userAccess("r-w-u-d"),deleteTypeController);

export default router;