import express from "express";
import {
  fetchCountryByIdController,
  addCountryController,
  deleteCountryController,
  fetchCountryByNameController,
  updateCountryController,
  fetchAllCountryController,
} from "../../controllers/other/country.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id", userAccess("r"), fetchCountryByIdController);
router.post("/name", userAccess("r"), fetchCountryByNameController);
router.post("/all", userAccess("r"), fetchAllCountryController);
router.post("/", userAccess("r-w"), addCountryController);
router.put("/", userAccess("r-w-u"), updateCountryController);
router.delete("/", userAccess("r-w-u-d"), deleteCountryController);

export default router;
