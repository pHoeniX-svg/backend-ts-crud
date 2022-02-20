import { handleLogin } from './authController';
import {
  createNewEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
} from './employeesController';
import { handleLogout } from './logoutController';
import { handleRefreshToken } from './refreshTokenController';
import { handleRegisterNewUser } from './registerController';
import { deleteUser, getAllUsers, getUser } from './usersController';

export {
  handleRefreshToken,
  createNewEmployee,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
  handleRegisterNewUser,
  getEmployee,
  handleLogout,
  handleLogin,
  deleteUser,
  getAllUsers,
  getUser,
};
