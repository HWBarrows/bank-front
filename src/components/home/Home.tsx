import { useContext, useState, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { SimpleContext } from '../../context/SimpleContext';
import './Home.scss';

export default function Home() {
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);
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

            <div className="ownerAccounts">
              <h4>Accounts</h4>
              <ul>
                {currentOwner.accounts.map((item, index) => (
                  <li key={index} id={item} onClick={(e) => getAccountInfo(e)}>
                    Account Number: {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="accountInfo">
            <ul>
              {accountInfo?.accountActivity.map((item, index) => (
                <li key={index + 1}>{item.timeStamp}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
