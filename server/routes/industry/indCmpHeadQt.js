import express from "express";
import {
  addIndCmpHeadQtController,
  deleteIndCmpHeadQtController,
  updateIndCmpHeadQtController,
  fetchIndCmpHeadQtController,
} from "../../controllers/industry/indCmpHeadQt.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id", userAccess("r"),fetchIndCmpHeadQtController);
router.post("/", userAccess("r-w"),addIndCmpHeadQtController);
router.put("/", userAccess("r-w-u"),updateIndCmpHeadQtController);
router.delete("/", userAccess("r-w-u-d"),deleteIndCmpHeadQtController);

export default router;
