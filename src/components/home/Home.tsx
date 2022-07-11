import { useContext, useState, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { SimpleContext } from '../../context/SimpleContext';
import Card from '../../card/Card';
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

  const validOwner = currentOwner && currentOwner.firstName.length > 1;

  function getAccountInfo(e: MouseEvent<HTMLLIElement>) {
    const target = e.target as Element;

    fetch(`http://localhost:3030/account/${target.id}`)
      .then((response) => response.json())
      .then((response) => setAccountInfo(response));
  }

  function logout() {
    if (setCurrentOwner) {
      setCurrentOwner(undefined);
    }
  }

  // function requestCreditCard() {
  //   const cardNumber = getCardNumber();
  //   const securityCode = getSecurityCode();
  //   const expiry = getExpiry();

  //   const config = {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       cardNumber: cardNumber,
  //       cardSecurityCode: securityCode,
  //       cardExpiry: expiry
  //     })
  //   };

  //   fetch(`http://localhost:3030/accountOwner/${currentOwner?._id}`, config)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       if (response.error) {
  //         alert(response.error);
  //       } else if (setCurrentOwner) {
  //         setCurrentOwner(response);
  //       }
  //     });
  // }

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
              {/* add card details that will be displayed when clicked */}
              {/* {currentOwner.cardExpiry && <div> Click to show card details </div>} */}
            </div>
            {currentOwner.cardExpiry && (
              // <div>
              //   <h1>Request new card</h1>
              //   <button onClick={() => requestCreditCard()}>Click me!</button>
              // </div>
              <Card />
            )}
            <div className="accountInfo">
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
          </div>
        </div>
      )}
    </div>
  );
}
