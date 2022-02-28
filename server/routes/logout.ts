import express from 'express';
import { handleLogout } from '~server/controllers';

const router = express.Router();

router.get('/', handleLogout);

module.exports = router;
