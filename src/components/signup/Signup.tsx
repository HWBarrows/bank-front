import React, { useReducer, ChangeEvent, useContext } from 'react';
import { SimpleContext } from '../../context/SimpleContext';
import { NavLink } from 'react-router-dom';
import './Signup.scss';

export default function CreateNew() {
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);

  function formReducer(
    state: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      street: string;
      city: string;
      state: string;
      zipcode: string;
      country: string;
    },
    action: { type: unknown; field: string; payload: string }
  ) {
    switch (action.type) {
      case 'textSubmit':
        return {
          ...state,
          [action.field]: action.payload
        };
      default:
        return state;
    }
  }

  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: ''
  };

  const [formState, dispatch] = useReducer(formReducer, initialState);

  function getText(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'textSubmit',
      field: e.target.name,
      payload: e.target.value
    });
  }

  const config = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      firstName: formState.firstName,
      lastName: formState.lastName,
      email: formState.email,
      password: formState.password,
      primaryAddress: {
        street: formState.street,
        city: formState.city,
        state: formState.state,
        zipcode: formState.zipcode,
        country: formState.country
      }
    })
  };

  function sendForm() {
    fetch('http://localhost:3030/accountOwner', config)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          alert(response.error);
        } else if (response._id && setCurrentOwner) {
          setCurrentOwner(response);
        }
      });
  }

  return (
    <div className="formWrapper">
      <form>
        <label>
          Please enter your first name
          <input
            type="text"
            name="firstName"
            placeholder="first name here"
            value={formState.firstName}
            onChange={(e) => getText(e)}
          />
        </label>
        <label>
          Please enter your last name
          <input
            type="text"
            name="lastName"
            placeholder="last name here"
            value={formState.lastName}
            onChange={(e) => getText(e)}
          />
        </label>
        <label>
          Email
          <input
            type="text"
            name="email"
            placeholder="me@example.com"
            value={formState.email}
            onChange={(e) => getText(e)}
          />
        </label>
        <label>
          Password
          <input
            type="text"
            name="password"
            placeholder="password here"
            value={formState.password}
            onChange={(e) => getText(e)}
          />
        </label>
        <br />
        <div>
          Address
          <label>
            <input
              type="text"
              name="street"
              placeholder="street"
              value={formState.street}
              onChange={(e) => getText(e)}
            />
          </label>
          <label>
            <input
              type="text"
              name="city"
              placeholder="city"
              value={formState.city}
              onChange={(e) => getText(e)}
            />
          </label>
          <label>
            <input
              type="text"
              name="state"
              placeholder="state, if applicable"
              value={formState.state}
              onChange={(e) => getText(e)}
            />
          </label>
          <label>
            <input
              type="text"
              name="zipcode"
              placeholder="zipcode"
              value={formState.zipcode}
              onChange={(e) => getText(e)}
            />
          </label>
          <label>
            <input
              type="text"
              name="country"
              placeholder="country"
              value={formState.country}
              onChange={(e) => getText(e)}
            />
          </label>
        </div>
      </form>
      <button onClick={() => sendForm()}>send</button>
      <NavLink to="/"> Click to return to Main Page</NavLink>
    </div>
  );
}
