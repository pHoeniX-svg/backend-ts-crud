import express from 'express';
import { handleLogin } from '~server/controllers';

const router = express.Router();

router.post('/', handleLogin);

module.exports = router;
