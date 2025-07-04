import express from "express";
import {
  fetchUniByIdController,
  addUniController,
  deleteUniController,
  fetchUniByNameController,
  updateUniController,
  fetchAllUniController,
  fetchUniByLimitController,
  fetchUniDataController
} from "../../controllers/university/uniMaster.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

//normal api
router.post("/id",userAccess("r"), fetchUniByIdController);
router.post("/name", userAccess("r"),fetchUniByNameController);
router.post("/all",userAccess("r"), fetchAllUniController);
router.post("/limit",userAccess("r"), fetchUniByLimitController);

router.post("/",userAccess("r-w"), addUniController);

router.put("/",userAccess("r-w-u"),updateUniController);

router.delete("/", userAccess("r-w-u-d"),deleteUniController);

//batch api
router.post("/batch/all",userAccess("r"), fetchUniDataController);

export default router;
