import express from 'express';
import { ROLES_LIST } from '~server/config';
import { deleteUser, getAllUsers, getUser } from '~server/controllers';
import { verifyRoles } from '~server/middleware';

const router = express.Router();

router
  .route('/')
  .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route('/:id').get(verifyRoles(ROLES_LIST.Admin), getUser);

module.exports = router;

//  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
