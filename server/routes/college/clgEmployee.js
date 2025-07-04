import express from "express";
import {
  fetchClgEmployeeByIdController,
  addClgEmployeeController,
  deleteClgEmployeeController,
  fetchClgEmployeeByNameController,
  updateClgEmployeeController,
  fetchAllClgEmployeeController,
  fetchClgEmployeeByLimitController,
  fetchEmpDataController,
  addClgEmployeeDesignationController,
  updateClgEmployeeDesignationController,
} from "../../controllers/college/clgEmployee.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

//normal api
router.post("/id", userAccess("r"), fetchClgEmployeeByIdController);
router.post("/name", userAccess("r"), fetchClgEmployeeByNameController);
router.post("/all", userAccess("r"), fetchAllClgEmployeeController);
router.post("/limit", userAccess("r"), fetchClgEmployeeByLimitController);
router.post("/", userAccess("r-w"), addClgEmployeeController);
router.put("/", userAccess("r-w-u"),updateClgEmployeeController);
router.delete("/", userAccess("r-w-u-d"), deleteClgEmployeeController);

//batch api
router.post("/batch/all", userAccess("r"), fetchEmpDataController);
router.post("/batch", userAccess("r-w"), addClgEmployeeDesignationController);
router.put("/batch", userAccess("r-w"), updateClgEmployeeDesignationController);

export default router;
