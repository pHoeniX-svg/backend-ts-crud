import express from 'express';
import { handleRegisterNewUser } from '~server/controllers';

const router = express.Router();

router.post('/', handleRegisterNewUser);

module.exports = router;
