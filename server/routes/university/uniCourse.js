import express from "express";
import {
  fetchUniCourseByIdController,
  addUniCourseController,
  deleteUniCourseController,
  fetchUniCourseByNameController,
  updateUniCourseController,
  fetchAllUniCourseController,
  fetchUniCourseByUniversityIdController
} from "../../controllers/university/uniCourse.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

//normal api
router.post("/id",userAccess("r"), fetchUniCourseByIdController);
router.post("/name", userAccess("r"),fetchUniCourseByNameController);
router.post("/all",userAccess("r"), fetchAllUniCourseController);
router.post("/",userAccess("r-w"), addUniCourseController);
router.put("/", userAccess("r-w-u"),updateUniCourseController);
router.delete("/", userAccess("r-w-u-d"),deleteUniCourseController);

//batch api
router.post("/batch/all",userAccess("r"), fetchUniCourseByUniversityIdController);

export default router;
