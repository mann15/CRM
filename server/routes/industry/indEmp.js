import express from "express";
import {
  fetchAllIndEmpController,
  fetchIndEmpByIdController,
  fetchIndEmpByNameController,
  addIndEmpController,
  updateIndEmpController,
  deleteIndEmpController,
  fetchEmpDataByCompanyIdController,
  addIndEmployeeDesignationController,
  updateIndEmployeeDesignationController,
} from "../../controllers/industry/indEmp.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

//normal api
router.post("/all", userAccess("r"), fetchAllIndEmpController);
router.post("/id", userAccess("r"), fetchIndEmpByIdController);
router.post("/name", userAccess("r"), fetchIndEmpByNameController);
router.post("/", userAccess("r-w-u"), addIndEmpController);
router.put("/", userAccess("r-w-u"), updateIndEmpController);
router.delete("/", userAccess("r-w-u-d"), deleteIndEmpController);

//batch api
router.post("/batch/all", userAccess("r"), fetchEmpDataByCompanyIdController);
router.post("/batch", userAccess("r-w"), addIndEmployeeDesignationController);
router.put("/batch", userAccess("r-w"), updateIndEmployeeDesignationController);

export default router;
