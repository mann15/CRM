import express from "express";
import {
  fetchUniEmployeeByIdController,
  addUniEmployeeController,
  deleteUniEmployeeController,
  fetchUniEmployeeByNameController,
  updateUniEmployeeController,
  fetchAllUniEmployeeController,
  fetchUniEmployeeByLimitController,
  fetchUniEmpDataByUniversityIdController,
  addUniEmployeeDesignationController,
  updateUniEmployeeDesignationController,
} from "../../controllers/university/uniEmployee.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

//normal api
router.post("/id", userAccess("r"), fetchUniEmployeeByIdController);
router.post("/name", userAccess("r"), fetchUniEmployeeByNameController);
router.post("/all", userAccess("r"), fetchAllUniEmployeeController);
router.post("/limit", userAccess("r"), fetchUniEmployeeByLimitController);
router.post("/",userAccess("r-w"),addUniEmployeeController);
router.put("/",userAccess("r-w-u"),updateUniEmployeeController);

router.delete("/", userAccess("r-w-u-d"), deleteUniEmployeeController);

//batch api
router.post("/batch", userAccess("r-w"), addUniEmployeeDesignationController);
router.put("/batch", userAccess("r-w"), updateUniEmployeeDesignationController);
router.post(
  "/batch/all",
  userAccess("r"),
  fetchUniEmpDataByUniversityIdController
);

export default router;
