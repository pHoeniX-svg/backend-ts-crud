/* VALIDATION */
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

/* API ROUTES */
const REGISTER_URL = '/register';
const LOGIN_URL = '/auth';
const LOGOUT_URL = '/logout';
const REFRESH_URL = '/refresh';

export {
  USER_REGEX,
  PWD_REGEX,
  REGISTER_URL,
  LOGIN_URL,
  LOGOUT_URL,
  REFRESH_URL,
};
