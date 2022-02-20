import express from 'express';
import { handleRefreshToken } from '~src/controllers';

const router = express.Router();

router.get('/', handleRefreshToken);

module.exports = router;
