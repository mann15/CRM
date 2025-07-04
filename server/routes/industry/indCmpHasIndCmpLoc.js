import express from 'express';
import {
  fetchIndCmpHasIndCmpLocByIdController,
  addIndCmpHasIndCmpLocController,
  deleteIndCmpHasIndCmpLocController,
  updateIndCmpHasIndCmpLocController,
  fetchAllIndCmpHasIndCmpLocController,
} from "../../controllers/industry/indCmpHasIndCmpLoc.js";
import { userAccess } from '../../middlewares/userAccess.js';
import { loggedIn } from '../../middlewares/loggedIn.js';

const router = express.Router();

router.use(loggedIn);

router.post("/id", userAccess("r"), fetchIndCmpHasIndCmpLocByIdController);
router.post('/all', userAccess('r'), fetchAllIndCmpHasIndCmpLocController);
router.post('/', userAccess('r-w'), addIndCmpHasIndCmpLocController);
router.put('/', userAccess('r-w-u'), updateIndCmpHasIndCmpLocController);
router.delete('/', userAccess('r-w-u-d'), deleteIndCmpHasIndCmpLocController);

export default router;