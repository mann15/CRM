import express from "express";
import {
  fetchIndByIdController,
  addIndController,
  addIndCmpController,
  deleteIndController,
  fetchIndByNameController,
  updateIndController,
  fetchAllIndController,
  fetchIndByLimitController,
} from "../../controllers/industry/indMaster.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

//normal api
router.post("/id", userAccess("r"), fetchIndByIdController);
router.post("/nameId", userAccess("r"), fetchIndByNameController);
router.post("/all", userAccess("r"), fetchAllIndController);
router.post("/limit", userAccess("r"), fetchIndByLimitController);
router.post("/", userAccess("r-w-u"), addIndController);
router.put("/", userAccess("r-w-u"), updateIndController);
router.delete("/", userAccess("r-w-u-d"), deleteIndController);

//batch api
router.post("/batch", userAccess("r-w"), addIndCmpController);

export default router;
