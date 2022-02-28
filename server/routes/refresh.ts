import express from 'express';
import { handleRefreshToken } from '~server/controllers';

const router = express.Router();

router.get('/', handleRefreshToken);

module.exports = router;
