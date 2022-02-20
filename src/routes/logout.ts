import express from 'express';
import { handleLogout } from '~src/controllers';

const router = express.Router();

router.get('/', handleLogout);

module.exports = router;
