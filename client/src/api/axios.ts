import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3500';
const JOKES_URL = 'https://icanhazdadjoke.com';
const JSPH_URL = 'https://jsonplaceholder.typicode.com';

// axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  baseURL: BASE_URL,
});

export const jokesAxios = axios.create({
  baseURL: JOKES_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});
export const jsonPH = axios.create({
  baseURL: JSPH_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});
