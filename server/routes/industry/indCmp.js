import express from "express";
import {
  fetchIndCmpByIdController,
  addIndCmpController,
  deleteIndCmpController,
  fetchIndCmpByNameController,
  updateIndCmpController,
  fetchAllIndCmpController,
  fetchIndCmpByLimitController,
  fetchIndDataController,
  updateIndCompanyController,
} from "../../controllers/industry/indCmp.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

//normal api
router.post("/id", userAccess("r"), fetchIndCmpByIdController);
router.post("/name", userAccess("r"), fetchIndCmpByNameController);
router.post("/all", userAccess("r"), fetchAllIndCmpController);
router.post("/limit", userAccess("r"), fetchIndCmpByLimitController);
router.post("/",userAccess("r-w"),addIndCmpController);
router.put("/",userAccess("r-w-u"),updateIndCmpController);

router.delete("/", userAccess("r-w-u-d"), deleteIndCmpController);

//batch api
router.put("/batch", userAccess("r-w-u"), updateIndCompanyController);
router.post("/batch/all", userAccess("r"), fetchIndDataController);

export default router;
