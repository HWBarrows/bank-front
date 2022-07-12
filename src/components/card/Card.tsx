import { useContext, useState, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { SimpleContext } from '../../context/SimpleContext';
import { getCardNumber, getSecurityCode, getExpiry } from '../getCard';
import './Card.scss';

export default function Card() {
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);

  function requestCreditCard() {
    const cardNumber = getCardNumber();
    const securityCode = getSecurityCode();
    const expiry = getExpiry();

    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cardNumber: cardNumber,
        cardSecurityCode: securityCode,
        cardExpiry: expiry
      })
    };

    fetch(`http://localhost:3030/accountOwner/${currentOwner?._id}`, config)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          alert(response.error);
        } else if (setCurrentOwner) {
          setCurrentOwner(response);
        }
      });
  }

  const lastFour = currentOwner?.cardNumber?.split(' ').pop();

  return (
    <div className="cardWrapper">
      {currentOwner?.cardExpiry && (
        <div>
          <div className="cardBody">
            <h3>BBHM Money</h3>
            <h2>{currentOwner.cardNumber}</h2>
            <h4>
              {currentOwner.cardExpiry} {currentOwner.cardSecurityCode}
            </h4>
          </div>
        </div>
      )}
      {!currentOwner?.cardExpiry && (
        <div>
          <h1>I would like to have a card</h1>
          <button onClick={() => requestCreditCard()}>Click me!</button>
        </div>
      )}
    </div>
  );
}
