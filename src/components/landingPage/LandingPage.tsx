import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { SimpleContext } from '../../context/SimpleContext';

export default function LandingPage() {
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);
  console.log({ landing: currentOwner });
  return (
    <div>
      Hi from Landing
      <NavLink to="/login"> Click to login </NavLink>
      <NavLink to="/signup"> Click to open a new account </NavLink>
    </div>
  );
}
