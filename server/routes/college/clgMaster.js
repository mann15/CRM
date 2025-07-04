import express from "express";
import {
  fetchClgByIdController,
  addClgController,
  deleteClgController,
  fetchClgByNameController,
  updateClgController,
  fetchAllClgController,
  fetchClgByLimitController,
  fetchAllCollegeController,
} from "../../controllers/college/clgMaster.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";
const router = express.Router();

router.use(loggedIn);

//normal api
router.post("/id", userAccess("r"), fetchClgByIdController);
router.post("/name", userAccess("r"), fetchClgByNameController);
router.post("/all", userAccess("r"), fetchAllClgController);
router.post("/limit", userAccess("r"), fetchClgByLimitController);
router.post("/",userAccess("r-w"),addClgController);
router.put("/",userAccess("r-w-u"),updateClgController);
router.delete("/", userAccess("r-w-u-d"), deleteClgController);

//batch api
router.post("/batch/all", userAccess("r"), fetchAllCollegeController);

export default router;
