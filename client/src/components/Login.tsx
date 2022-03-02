import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '~src/api/axios';
import { useAuth } from '~src/hooks';
import { FormEventType } from '~src/types';

const LOGIN_URL = '/auth';

type LocationProps = {
  state: {
    from: Location;
  };
};

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation() as unknown as LocationProps;

  const from = location.state?.from?.pathname || '/';

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEventType) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ user, pwd, accessToken, roles });
      setSuccess(true);
      e.currentTarget.reset();
    } catch (error) {
      const e = error as AxiosError;
      if (!e?.response) {
        setErrMsg('No Server Response');
      } else if (e?.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (e?.response?.status === 401) {
        setErrMsg('Event Unauthorized');
      } else {
        setErrMsg('Login Failed: Unknown Error');
      }
      errRef?.current?.focus();
    }
  };

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="jdjdjd">Go to home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            aria-live="assertive"
            className={errMsg ? 'errmsg' : 'offscreen'}
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            {/* USERNAME */}
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
            {/* PASSWORD */}
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              // required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="local">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export { Login };
