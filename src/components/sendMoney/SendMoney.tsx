import React, { useContext, useState, useReducer, ChangeEvent, MouseEvent } from 'react';
import { SimpleContext } from '../../context/SimpleContext';
import './SendMoney.scss';

export default function SendMoney() {
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [warning, setWarning] = useState(false);

  function filterAmountInput() {
    const amountArray = amount.split('');
    const numberVerify = amountArray.map((item: string) => parseInt(item));
    return numberVerify.every((item: unknown) => !Number.isNaN(item));
  }
  const [getRecipientInfo, setGetRecipientInfo] = useState<{
    accountActivity: {
      timeStamp: string;
      from: string;
      type: string;
      amount: number;
      currency: string;
    }[];
    accountBalance: number;
    accountCurrency: string;
    accountOwner: string;
    accountType: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    _id: string;
  }>({
    accountActivity: [],
    accountBalance: 0,
    accountCurrency: '',
    accountOwner: '',
    accountType: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
    _id: ''
  });

  const [sendAccount, setSendAccount] = useState<{
    accountActivity: [string];
    accountBalance: number;
    accountCurrency: string;
    accountOwner: string;
    accountType: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    _id: string;
  }>({
    accountActivity: [''],
    accountBalance: 0,
    accountCurrency: '',
    accountOwner: '',
    accountType: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
    _id: ''
  });

  function sendRecipientMoney() {
    if (receiver.length < 1) {
      alert("Please enter recipient's account number");
    } else if (!filterAmountInput()) {
      alert('Only use numbers for amount');
    } else if (currency.length < 1 || amount.length < 1) {
      alert('All fields must be complete');
    }
    //this function will first get recipients account balance
    function recipientGetInfo() {
      fetch(`http://localhost:3030/account/${receiver}`)
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            alert(response.error);
          } else {
            setGetRecipientInfo(response);
            console.log(getRecipientInfo);
          }
        });
      // if (receiver.length < 1) {
      //   alert("Please enter recipient's account number");
      // } else if (!filterAmountInput()) {
      //   alert('Only use numbers for amount');
      // } else if (currency.length < 1 || amount.length < 1) {
      //   alert('All fields must be complete');
      // } else {
      //   fetch(`http://localhost:3030/account/${receiver}`)
      //     .then((response) => response.json())
      //     .then((response) => {
      //       if (response.error) {
      //         alert(response.error);
      //       } else {
      //         setGetRecipientInfo(response);
      //         console.log(getRecipientInfo);
      //       }
      //     });
      // }
    }
    //this function increases the balance
    function newRecipientBalance() {
      const amountArray = amount.split('');
      const numberVerify = amountArray.map((item: string) => parseInt(item));
      if (numberVerify.every((item: unknown) => !Number.isNaN(item))) {
        const verifiedNumbers = Number(numberVerify.join(''));
        const sum = verifiedNumbers + getRecipientInfo.accountBalance;
        return sum;
      } else {
        return false;
      }
    }

    recipientGetInfo();
    newRecipientBalance();

    const config = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        identifier: receiver,
        accountBalance: newRecipientBalance(),
        accountActivity: getRecipientInfo.accountActivity.push({
          timeStamp: new Date().toLocaleDateString(),
          from: `${currentOwner?.firstName} + ${currentOwner?.firstName}`,
          type: 'deposit',
          amount: Number(amount),
          currency: currency
        })
      })
    };

    fetch(`http://localhost:3030/account/${receiver}`, config)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          alert(response.error);
        } else {
          alert('success');
        }
      });
  }
  //setGetRecipientInfo(getRecipientInfo.accountBalance:newRecipientBalance)
  //this is the list item onclick
  function accountInfoSendMoney(e: MouseEvent<HTMLLIElement>) {
    const target = e.target as Element;

    fetch(`http://localhost:3030/account/${target.id}`)
      .then((response) => response.json())
      .then((response) => setSendAccount(response));
  }

  return (
    <div>
      {currentOwner && (
        <div className="sendWrapper">
          <div className="sendMoneyFromWrapper">
            <h1>From</h1>
            <p>which account?</p>
            {currentOwner.accounts.map((item, index) => (
              <li key={index} id={item} onClick={(e) => accountInfoSendMoney(e)}>
                {item}
              </li>
            ))}
          </div>
          <div className="sendMoneyToWrapper">
            <h4>
              Total allowable amount to send: {sendAccount.accountBalance}{' '}
              {sendAccount.accountCurrency}
            </h4>
            <p> from: {sendAccount._id}</p>

            <form className="sendMoneyForm">
              <label>
                Please enter recipient{`'`}s account number
                <input
                  type="text"
                  placeholder="where is it going?"
                  value={receiver}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setReceiver(e.target.value)}
                />
              </label>
              <label>
                Please enter the amount to send
                <input
                  type="text"
                  name="amount"
                  placeholder="amount to send"
                  value={amount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                />
              </label>
              <label>
                Please enter a 3 digit Currency Code
                <input
                  type="text"
                  maxLength={3}
                  value={currency}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCurrency(e.target.value.toUpperCase())
                  }
                />
              </label>
            </form>
            <button onClick={() => sendRecipientMoney()}>Test stuff</button>
          </div>
          {!filterAmountInput() && (
            <div className="warning">
              <p>Enter numbers only</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
