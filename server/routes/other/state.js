import express from "express";
import {
  fetchStateByIdController,
  addStateController,
  deleteStateController,
  fetchStateByNameController,
  updateStateController,
  fetchAllStateController,
} from "../../controllers/other/state.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id", userAccess("r"), fetchStateByIdController);
router.post("/name", userAccess("r"), fetchStateByNameController);
router.post("/all", userAccess("r"), fetchAllStateController);
router.post("/", userAccess("r-w"), addStateController);
router.put("/", userAccess("r-w-u"), updateStateController);
router.delete("/", userAccess("r-w-u-d"), deleteStateController);

export default router;
