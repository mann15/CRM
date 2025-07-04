import express from 'express';
import{
    fetchIndEmpHasIndDesByIdController,
    addIndEmpHasIndDesController,
    deleteIndEmpHasIndDesController,
    updateIndEmpHasIndDesController,
    fetchAllIndEmpHasIndDesController,
} from "../../controllers/industry/indEmpHasIndDes.js";

import { userAccess } from '../../middlewares/userAccess.js';
import { loggedIn } from '../../middlewares/loggedIn.js';

const router = express.Router();

router.use(loggedIn);

router.post("/id", userAccess("r"), fetchIndEmpHasIndDesByIdController);
router.post('/all', userAccess('r'), fetchAllIndEmpHasIndDesController);
router.post('/', userAccess('r-w'), addIndEmpHasIndDesController);
router.put('/', userAccess('r-w-u'), updateIndEmpHasIndDesController);
router.delete('/', userAccess('r-w-u-d'), deleteIndEmpHasIndDesController);

export default router;