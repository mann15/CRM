import express from "express";
import {
  fetchAllIndCmpLocController,
  addIndCmpLocController,
  updateIndCmpLocController,
  deleteIndCmpLocController,
} from "../../controllers/industry/indCmpLoc.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id",userAccess("r"),fetchAllIndCmpLocController);
router.post("/", userAccess("r-w"),addIndCmpLocController);
router.put("/", userAccess("r-w-u"),updateIndCmpLocController);
router.delete("/", userAccess("r-w-u-d"),deleteIndCmpLocController);

export default router;
