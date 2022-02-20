import express from 'express';
import { handleRegisterNewUser } from '~src/controllers';

const router = express.Router();

router.post('/', handleRegisterNewUser);

module.exports = router;
