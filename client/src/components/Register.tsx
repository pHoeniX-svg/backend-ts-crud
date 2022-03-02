import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from '~src/api/axios';
import { FormEventType } from '~src/types';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEventType) => {
    e.preventDefault();

    //if btn is enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('invalid user or password');
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          user,
          pwd,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(response.data);

      setSuccess(true);

      //clear state and controlled inputs
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (error) {
      const e = error as AxiosError;
      if (!e?.response) {
        setErrMsg('No Server Response');
      } else if (e?.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed: Unknown Error');
      }
      errRef.current?.focus();
    }
  };

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    const isValidUser = USER_REGEX.test(user);
    setValidName(isValidUser);
  }, [user]);

  useEffect(() => {
    const isValidPwd = PWD_REGEX.test(pwd);
    setValidPwd(isValidPwd);

    const match = pwd === matchPwd;
    setValidMatchPwd(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  return (
    <>
      {success ? (
        <section className="success">
          <h1>Success!</h1>
          <p>
            <Link to="/login">Sign In</Link>
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
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            {/* USERNAME */}
            <label htmlFor="username">
              Username:
              <FaCheck className={validName ? 'valid' : 'hide'} />
              <FaTimes className={validName || !user ? 'hide' : 'invalid'} />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="name"
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onBlur={() => setUserFocus(false)}
              onFocus={() => setUserFocus(true)}
              required
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? 'instructions' : 'offscreen'
              }
            >
              <FaInfoCircle />
              4 to 24 characters. <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed
            </p>
            {/* PASSWORD */}
            <label htmlFor="password">
              Password:
              <FaCheck className={validPwd ? 'valid' : 'hide'} />
              <FaTimes className={validPwd || !pwd ? 'hide' : 'invalid'} />
            </label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onBlur={() => setPwdFocus(false)}
              onFocus={() => setPwdFocus(true)}
              required
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
            >
              <FaInfoCircle />
              8 to 24 characters. <br />
              Must include uppercase and lowecase letters, a number and a
              special character.
              <br />
              Allowed special characters:{' '}
              <span aria-label="exclamation mark">!</span>&nbsp;
              <span aria-label="at symbol">@</span>&nbsp;
              <span aria-label="hashtag">#</span>&nbsp;
              <span aria-label="dollar sign">$</span>&nbsp;
              <span aria-label="percent">%</span>
              <br />
              Letters, numbers, underscores, hyphens allowed
            </p>
            {/* CONFIRM PASSWORD */}
            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FaCheck
                className={validMatchPwd && matchPwd ? 'valid' : 'hide'}
              />
              <FaTimes
                className={validMatchPwd || !matchPwd ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              autoComplete="new-password"
              aria-invalid={validMatchPwd ? 'false' : 'true'}
              aria-describedby="confirmnote"
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              onBlur={() => setMatchPwdFocus(false)}
              onFocus={() => setMatchPwdFocus(true)}
              required
            />{' '}
            <p
              id="confirmnote"
              className={
                matchPwdFocus && !validMatchPwd ? 'instructions' : 'offscreen'
              }
            >
              <FaInfoCircle />
              Must match the first password input field.
            </p>
            <button
              disabled={
                !validName || !validPwd || !validMatchPwd ? true : false
              }
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export { Register };
