import express from 'express';
import { handleLogin } from '~src/controllers';

const router = express.Router();

router.post('/', handleLogin);

module.exports = router;
