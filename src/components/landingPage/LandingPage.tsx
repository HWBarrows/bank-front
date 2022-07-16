import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { SimpleContext } from '../../context/SimpleContext';
import './LandingPage.scss';

export default function LandingPage() {
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);

  return (
    <div className="landingWrapper">
      <p className="title">B b h M M</p>
      <p className="subtitle">THE NEW BANK OF TODAY</p>
      <div className="links">
        <NavLink to="/login"> Click to login </NavLink>
        <NavLink to="/signup"> Click to open a new account </NavLink>
      </div>
    </div>
  );
}
