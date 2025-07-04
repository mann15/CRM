import express from "express";
import {
  fetchCityByIdController,
  addCityController,
  deleteCityController,
  fetchCityByNameController,
    updateCityController,
    fetchAllCityController
} from "../../controllers/other/city.js";
import { userAccess } from "../../middlewares/userAccess.js";
import { loggedIn } from "../../middlewares/loggedIn.js";

const router = express.Router();

router.use(loggedIn);

router.post("/id", userAccess("r"),fetchCityByIdController);
router.post("/name", userAccess("r"),fetchCityByNameController);
router.post("/all", userAccess("r"),fetchAllCityController);
router.post("/", userAccess("r-w"),addCityController);
router.put("/", userAccess("r-w-u"),updateCityController);
router.delete("/", userAccess("r-w-u-d"),deleteCityController);

export default router;