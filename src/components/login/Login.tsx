import React, { useContext, useState, MouseEvent, ChangeEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { SimpleContext } from '../../context/SimpleContext';
import './Login.scss';

export default function Login() {
  //states for API call
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);
  const [responseError, setResponseError] = useState({ error: '' });

  //form inputs
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  function loginAccountOwner(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    const config = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput
      })
    };

    fetch('http://localhost:3030/login', config)
      .then((response) => response.json())
      .then((response) => {
        if (setCurrentOwner && response._id) {
          setCurrentOwner(response);
        } else if (response.error) {
          setResponseError(response);
        }
      });
  }

  return (
    <div className="loginWrapper">
      <div className="prettySideBar"></div>
      <div className="floater">
        <div className="mainContent">
          <form>
            <label>
              <input
                type="text"
                placeholder="Please enter your email"
                value={emailInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailInput(e.target.value)}
              />
            </label>
            <label>
              <input
                type="password"
                placeholder="Please enter your password"
                value={passwordInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordInput(e.target.value)}
              />
            </label>
          </form>
          <div className="loginError">{responseError && <p>{responseError?.error}</p>}</div>
          <div className="loginLinks">
            <button onClick={(e) => loginAccountOwner(e)}>Login</button>
            <p>
              Or click <NavLink to="/signup"> here </NavLink>
              to open a new account
            </p>
          </div>
        </div>
        <p className="loginTitle">BbhMM</p>
      </div>
    </div>
  );
}
