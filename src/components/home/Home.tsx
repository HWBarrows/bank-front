import { useContext, useState, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { SimpleContext } from '../../context/SimpleContext';
import Card from '../card/Card';
import AccountForm from '../../accountForm/accountForm';
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
        from?: '';
        to?: '';
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
  const [accountInfoDisplay, setAccountInfoDisplay] = useState('accountInfo');
  const [homesCardWrapperDisplay, setHomesCardWrapperDisplay] = useState('hide');
  const [homesAccountFormWrapper, setHomesAccountFormWrapper] = useState('hide');
  const validOwner = currentOwner && currentOwner.firstName.length > 1;

  function getAccountInfo(e: MouseEvent<HTMLLIElement>) {
    const target = e.target as Element;

    fetch(`http://localhost:3030/account/${target.id}`)
      .then((response) => response.json())
      .then((response) => setAccountInfo(response));

    setAccountInfoDisplay('accountInfo');
    setHomesCardWrapperDisplay('hide');
    setHomesAccountFormWrapper('hide');
  }

  function logout() {
    if (setCurrentOwner) {
      setCurrentOwner(undefined);
    }
  }

  function showCardComponent() {
    setHomesCardWrapperDisplay('homesCardWrapper');
    setAccountInfoDisplay('hide');
    setHomesAccountFormWrapper('hide');
  }

  function showAccountForm() {
    setHomesAccountFormWrapper('homesAccountFormWrapper');
    if (accountInfoDisplay !== 'hide') {
      setAccountInfoDisplay('hide');
    }
    if (homesCardWrapperDisplay !== 'hide') {
      setHomesCardWrapperDisplay('hide');
    }
  }

  return (
    <div className="homeWrapper">
      {!validOwner && (
        <NavLink to="/">
          No Account Found. Please return to landing page to register or login
        </NavLink>
      )}
      {validOwner && (
        <div className="ownerWrapper">
          <div className="ownerInfo">
            <h3>
              Hello {currentOwner.firstName} {currentOwner.lastName}
            </h3>
            <ul>
              <li>{currentOwner.primaryAddress.street}</li>
              <li>
                {currentOwner.primaryAddress.city}, {currentOwner.primaryAddress.state}{' '}
                {currentOwner.primaryAddress.zipcode}
              </li>
            </ul>

            <button onClick={() => logout()}>Click to logout</button>
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
                <li>Create new account</li>
              </ul>

              <h4 onClick={() => showCardComponent()}>Card</h4>
              <h4 onClick={() => showAccountForm()}>Create a new account</h4>
            </div>
            {currentOwner && (
              // <div>
              //   <h1>Request new card</h1>
              //   <button onClick={() => requestCreditCard()}>Click me!</button>
              // </div>
              <div className={`${homesCardWrapperDisplay}`}>
                <Card />
              </div>
            )}
            <div className={`${accountInfoDisplay}`}>
              {!accountInfo?._id && <p>Click on an account to see activity</p>}
              {/* {!validAccountActivity && <p> No account activity to show</p>} */}
              {accountInfo && (
                <ul>
                  <p>
                    Account Balance: {accountInfo.accountBalance} {accountInfo.accountCurrency}
                  </p>
                  {accountInfo.accountActivity.length > 1 ? (
                    accountInfo?.accountActivity.map((item, index) => (
                      <li key={index + 1}>
                        <div className="vendor">
                          <h5>{item.from ? 'from: ' + item.from : 'to: ' + item.to}</h5>
                          <p>{item.type}</p>
                        </div>

                        <div className="amount">
                          {item.amount} {item.currency}
                        </div>
                      </li>
                    ))
                  ) : (
                    <p> No account activity to show</p>
                  )}
                </ul>
                // add a div to display card info in place of account activity
              )}
            </div>
            {currentOwner && (
              <div className={`${homesAccountFormWrapper}`}>
                <AccountForm />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
