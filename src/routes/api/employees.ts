import express from 'express';
import { ROLES_LIST } from '~src/config';
import {
  createNewEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
} from '~src/controllers';
import { verifyRoles } from '~src/middleware';

const router = express.Router();

router
  .route('/')
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), deleteEmployee);

router.route('/:id').get(getEmployee);

module.exports = router;
