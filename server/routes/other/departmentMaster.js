import express from "express";
import {
    fetchDepartmentByIdController,
    addDepartmentController,
    deleteDepartmentController,
    fetchDepartmentByNameController,
    updateDepartmentController,
    fetchAllDepartmentController
} from "../../controllers/other/departmentMaster.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id", userAccess("r"),fetchDepartmentByIdController);
router.post("/name", userAccess("r"),fetchDepartmentByNameController);
router.post("/all", userAccess("r"),fetchAllDepartmentController);
router.post("/",userAccess("r-w"),addDepartmentController);
router.put("/",userAccess("r-w-u"),updateDepartmentController);
router.delete("/", userAccess("r-w-u-d"),deleteDepartmentController);

export default router;