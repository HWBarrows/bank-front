import { useContext, useState, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { SimpleContext } from '../../context/SimpleContext';
import Card from '../card/Card';
import AccountForm from '../accountForm/AccountForm';
import './Home.scss';
import SendMoney from '../sendMoney/SendMoney';

export default function Home() {
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);
  //displays accounts and balance
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

  //display other components
  const [homesCardWrapperDisplay, setHomesCardWrapperDisplay] = useState('hide');
  const [homesAccountFormWrapper, setHomesAccountFormWrapper] = useState('hide');
  const [sendMoneyDisplay, setSendMoneyDisplay] = useState('hide');
  const validOwner = currentOwner && currentOwner.firstName.length > 1;

  // const [from, setFrom] = useState('');
  // const [action, setAction] = useState('');
  // const [amount, setAmount] = useState(0);

  // const defaultAccountId = accountInfo?._id || '';
  // const defaultAccountBalance = accountInfo?.accountBalance || -1;

  function getAccountInfo(e: MouseEvent<HTMLLIElement>) {
    const target = e.target as Element;

    fetch(`http://localhost:3030/account/${target.id}`)
      .then((response) => response.json())
      .then((response) => setAccountInfo(response));

    setAccountInfoDisplay('accountInfo');
    setHomesCardWrapperDisplay('hide');
    setHomesAccountFormWrapper('hide');
    setSendMoneyDisplay('hide');
  }

  function logout() {
    if (setCurrentOwner) {
      setCurrentOwner(undefined);
    }
  }

  //the following lines NEED to be changed to a state object
  function showCardComponent() {
    setHomesCardWrapperDisplay('homesCardWrapper');
    setAccountInfoDisplay('hide');
    setHomesAccountFormWrapper('hide');
    setSendMoneyDisplay('hide');
  }

  function showAccountForm() {
    setHomesAccountFormWrapper('homesAccountFormWrapper');
    if (accountInfoDisplay !== 'hide') {
      setAccountInfoDisplay('hide');
    }
    if (homesCardWrapperDisplay !== 'hide') {
      setHomesCardWrapperDisplay('hide');
    }
    if (sendMoneyDisplay !== 'hide') {
      setSendMoneyDisplay('hide');
    }
  }
  function showSendMoney() {
    setSendMoneyDisplay('homesSendMoneyWrapper');
    if (accountInfoDisplay !== 'hide') {
      setAccountInfoDisplay('hide');
    }
    if (homesCardWrapperDisplay !== 'hide') {
      setHomesCardWrapperDisplay('hide');
    }
    if (homesAccountFormWrapper !== 'hide') {
      setHomesAccountFormWrapper('hide');
    }
  }
  function displayBalance() {
    if (accountInfo?.accountBalance)
      return new Intl.NumberFormat().format(accountInfo?.accountBalance);
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
          <div className="ownerFloater"></div>
          <div className="accountsWrapper">
            <div className="ownerAccounts">
              <h4>Accounts</h4>
              {currentOwner.accounts.length > 0 ? (
                <ul>
                  {currentOwner.accounts.map((item, index) => (
                    <li key={index} id={item} onClick={(e) => getAccountInfo(e)}>
                      Account Number: {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p> No accounts to show </p>
              )}
              <h4 onClick={() => showAccountForm()}>Create a new account</h4>
              <h4 onClick={() => showCardComponent()}>Card</h4>
              <h4 onClick={() => showSendMoney()}>Send Money</h4>
              <button className="logout" onClick={() => logout()}>
                Click to logout
              </button>
            </div>
            <div className="mainHomeContent">
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
              </div>
              <div className={`${accountInfoDisplay}`}>
                {!accountInfo?._id && <p>Click on an account to see activity</p>}
                {accountInfo && (
                  <ul>
                    <p>
                      Account Balance: {displayBalance()} {accountInfo.accountCurrency}
                    </p>
                    {accountInfo.accountActivity.length >= 1 ? (
                      accountInfo?.accountActivity
                        .map((item, index) => (
                          <li key={index + 1}>
                            <div className="vendor">
                              <h5>{item.from ? 'from: ' + item.from : 'to: ' + item.to}</h5>
                              <p>{item.type}</p>
                              <p>{item.timeStamp}</p>
                            </div>

                            <div className="amount">
                              {item.from ? '+' : '-'} {item.amount} {item.currency}
                            </div>
                          </li>
                        ))
                        .reverse()
                    ) : (
                      <p> No account activity to show</p>
                    )}
                  </ul>
                  // add a div to display card info in place of account activity
                )}
              </div>
              {currentOwner && (
                <div className={`${homesCardWrapperDisplay}`}>
                  <Card />
                </div>
              )}
              {currentOwner && (
                <div className={`${sendMoneyDisplay}`}>
                  <SendMoney />
                </div>
              )}

              {currentOwner && (
                <div className={`${homesAccountFormWrapper}`}>
                  <AccountForm />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
