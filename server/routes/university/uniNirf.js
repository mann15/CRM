import express from "express";
import {
    fetchNirfByIdController,
    addNirfController,
    deleteNirfController,
    fetchNirfByNameController,
    updateNirfController,
    fetchAllNirfController
} from "../../controllers/university/uniNirf.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id", userAccess("r"),fetchNirfByIdController);
router.post("/rank", userAccess("r"),fetchNirfByNameController);
router.post("/all",userAccess("r"), fetchAllNirfController);
router.post("/", userAccess("r-w"),addNirfController);
router.put("/", userAccess("r-w-u"),updateNirfController);
router.delete("/", userAccess("r-w-u-d"),deleteNirfController);

export default router;