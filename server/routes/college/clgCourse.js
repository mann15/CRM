import express from "express";
import {
  fetchClgCourseByIdController,
  addClgCourseController,
  deleteClgCourseController,
  fetchClgCourseByNameController,
  updateClgCourseController,
  fetchAllClgCourseController,
  fetchCollegeCourseByCollegeIdController,
} from "../../controllers/college/clgCourse.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

//normal api
router.post("/id",userAccess("r"), fetchClgCourseByIdController);
router.post("/name", userAccess("r"),fetchClgCourseByNameController);
router.post("/all",userAccess("r"), fetchAllClgCourseController);
router.post("/",userAccess("r-w"), addClgCourseController);
router.put("/", userAccess("r-w-u"),updateClgCourseController);
router.delete("/", userAccess("r-w-u-d"),deleteClgCourseController);

//batch api
router.post(
  "/batch/all",
  userAccess("r"),
  fetchCollegeCourseByCollegeIdController
);

export default router;
