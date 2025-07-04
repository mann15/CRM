import express from "express";
import {
  fetchIndNameByIdController,
  addIndNameController,
  deleteIndNameController,
  fetchIndNameByNameController,
  updateIndNameController,
  fetchAllIndNameController,
} from "../../controllers/industry/indName.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id", userAccess("r"), fetchIndNameByIdController);
router.post("/name", userAccess("r"), fetchIndNameByNameController);
router.post("/all", userAccess("r"), fetchAllIndNameController);
router.post("/", userAccess("r-w-u"), addIndNameController);
router.put("/", userAccess("r-w-u"), updateIndNameController);
router.delete("/", userAccess("r-w-u-d"), deleteIndNameController);

export default router;