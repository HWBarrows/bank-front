import { useState, useEffect, useContext } from 'react';
// import { CurrentAccountOwnerContext } from '../../context/CurrentOwnerContext';

export default function Login() {
  // const { currentAccountOwner, setCurrentAccountOwner } = useContext(CurrentAccountOwnerContext);

  return (
    <div>
      <form>
        <label>
          Please enter your email address
          <input type="text" placeholder="example@email.com" />
        </label>
      </form>
    </div>
  );
}
