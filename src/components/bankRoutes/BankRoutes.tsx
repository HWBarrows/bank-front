import { useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SimpleContext } from '../../context/SimpleContext';
import Home from '../home/Home';
import LandingPage from '../landingPage/LandingPage';
import Login from '../login/Login';
import Shopping from '../shopping/Shopping';

export default function BankRoutes() {
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);
  // const [cartIsEmpty] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/shopping" element={<Shopping />} />
      {/* <Route path="/login" element={<Login />} /> */}

      {/* <Route path="/redirect" element={<Navigate to="/" />} /> */}
      <Route
        path="/login"
        element={currentOwner && currentOwner.firstName.length > 1 ? <Home /> : <Login />}
      />
    </Routes>
  );
}
