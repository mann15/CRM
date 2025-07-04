import express from "express";
import {
  fetchDesignationByIdController,
  addDesignationController,
  deleteDesignationController,
  fetchDesignationByNameController,
  updateDesignationController,
  fetchAllDesignationController,
} from "../../controllers/common/designation.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id", userAccess("r"), fetchDesignationByIdController);
router.post("/name", userAccess("r"), fetchDesignationByNameController);
router.post("/all", userAccess("r"), fetchAllDesignationController);
router.post("/", userAccess("r-w"), addDesignationController);
router.put("/", userAccess("r-w-u"), updateDesignationController);
router.delete("/", userAccess("r-w-u-d"), deleteDesignationController);

export default router;
