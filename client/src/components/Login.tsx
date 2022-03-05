import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '~src/api/axios';
import { LOGIN_URL } from '~src/constants';
import { useAuth, useInput, useToggle } from '~src/hooks';
import { FormEventType } from '~src/types';

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

  const [user, resetUser, userAttribs] = useInput('user', '');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [check, toggleCheck] = useToggle('persist', false);

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
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      resetUser();
      setPwd('');
      navigate(from, { replace: true });
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
          {...userAttribs}
          required
        />
        {/* PASSWORD */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <button>Sign In</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            name="persist"
            id="persist"
            checked={check}
            onChange={() => toggleCheck(check)}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register">Go to home</Link>
        </span>
      </p>
    </section>
  );
};

export { Login };
