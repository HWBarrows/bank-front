import { useContext, useState, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { SimpleContext } from '../../context/SimpleContext';
import './Home.scss';

export default function Home() {
  const { currentOwner } = useContext(SimpleContext);
  const [accountInfo, setAccountInfo] = useState<{
    _id: '';
    accountOwner: '';
    accountBalance: 0;
    accountCurrency: '';
    accountType: '';
    accountActivity: [
      {
        timeStamp: '';
        from: '';
        type: '';
        amount: 0;
        currency: '';
      }
    ];
    cardNumber?: '';
    cardSecurityCode?: 0;
    cardExpiry?: '';
    createdAt: '';
    updatedAt: '';
    __v: 0;
  }>();

  const valid = currentOwner && currentOwner.firstName.length > 1;

  function getAccountInfo(e: MouseEvent<HTMLLIElement>) {
    const target = e.target as Element;

    fetch(`http://localhost:3030/account/${target.id}`)
      .then((response) => response.json())
      .then((response) => setAccountInfo(response));
  }

  return (
    <div className="homeWrapper">
      {!valid && (
        <NavLink to="/">
          No Account Found. Please return to landing page to register or login
        </NavLink>
      )}
      {valid && (
        <div className="ownerWrapper">
          <div className="ownerInfo">
            <h3>
              Hello {currentOwner.firstName} {currentOwner.lastName}
            </h3>
            <ul>
              <li>Primary Address</li>
              <li>{currentOwner.primaryAddress.street}</li>
              <li>
                {currentOwner.primaryAddress.city}, {currentOwner.primaryAddress.state}{' '}
                {currentOwner.primaryAddress.zipcode}
              </li>
            </ul>
          </div>
          <div className="accountsWrapper">
            <div className="ownerAccounts">
              <h4>Accounts</h4>
              <ul>
                {currentOwner.accounts.map((item, index) => (
                  <li key={index} id={item} onClick={(e) => getAccountInfo(e)}>
                    Account Number: {item}
                  </li>
                ))}
              </ul>
              cards
            </div>

            <div className="accountInfo">
              <ul>
                {accountInfo?.accountActivity.map((item, index) => (
                  <li key={index + 1}>
                    <div className="vendor">
                      <h5>{item.from}</h5>
                      <p>{item.type}</p>
                    </div>

                    <div className="amount">
                      {item.amount} {item.currency}
                    </div>
                    {/* <div className="time">{item.timeStamp}</div>  */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
