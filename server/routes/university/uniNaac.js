import express from "express";
import {
    fetchNaacByIdController,
    addNaacController,
    deleteNaacController,
    fetchNaacByNameController,
    updateNaacController,
    fetchAllNaacController
} from "../../controllers/university/uniNaac.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id", userAccess("r"),fetchNaacByIdController);
router.post("/grade", userAccess("r"),fetchNaacByNameController);
router.post("/all", userAccess("r"),fetchAllNaacController);
router.post("/", userAccess("r-w"),addNaacController);
router.put("/",userAccess("r-w-u"), updateNaacController);
router.delete("/", userAccess("r-w-u-d"),deleteNaacController);

export default router;