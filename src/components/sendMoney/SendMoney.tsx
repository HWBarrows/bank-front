import React, { useContext, useState, useReducer, ChangeEvent, MouseEvent } from 'react';
import { SimpleContext } from '../../context/SimpleContext';
import './SendMoney.scss';

export default function SendMoney() {
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [warning, setWarning] = useState(false);

  function filterAmount() {
    const amountArray = amount.split('');
    console.log('I am amountArray' + amountArray);
    const numberVerify = amountArray.map((item: string) => parseInt(item));
    console.log(numberVerify);
    return numberVerify.every((item: unknown) => Number.isNaN(item));
  }
  console.log(filterAmount());
  if (!filterAmount()) {
    setWarning(true);
  }

  const [sendAccount, setSendAccount] = useState<{
    accountActivity: [string];
    accountBalance: number;
    accountCurrency: string;
    accountOwner: string;
    accountType: string;
    cardExpiry: string;
    cardNumber: string;
    cardSecurityCode: number;
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
    cardExpiry: '',
    cardNumber: '',
    cardSecurityCode: 0,
    createdAt: '',
    updatedAt: '',
    __v: 0,
    _id: ''
  });

  const config = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      // heading: formState.heading,
      // author: formState.author,
      // photoUrl: formState.photoUrl,
      // topic: formState.topic,
      // content: [...contentArray]
    })
  };

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
            <h3>which account?</h3>
            {currentOwner.accounts.map((item, index) => (
              <li key={index} id={item} onClick={(e) => accountInfoSendMoney(e)}>
                Account Number: {item}
              </li>
            ))}
          </div>
          <div className="sendMoneyToWrapper">
            <p>
              {sendAccount.accountBalance} {sendAccount.accountCurrency}
            </p>

            <form className="sendMoneyForm">
              <label>
                Please enter the account number for the person receiving the funds
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
              <input type="text" placeholder="which currency?" />
            </form>
          </div>
          {warning && (
            <div className="warning">
              <p>Only enter numbers</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
