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
    <div>
      <form>
        <label>
          Please enter your email address
          <input
            type="text"
            placeholder="example@email.com"
            value={emailInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailInput(e.target.value)}
          />
        </label>
        <label>
          Please enter your password
          <input
            type="password"
            placeholder="password"
            value={passwordInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordInput(e.target.value)}
          />
        </label>
        <button onClick={(e) => loginAccountOwner(e)}>Click to login</button>
      </form>
      <div>{responseError && <h4>{responseError?.error}</h4>}</div>
      <NavLink to="/"> Click to go landing Page</NavLink>
    </div>
  );
}
