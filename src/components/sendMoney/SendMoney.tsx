import React, { useContext, useState, useReducer, ChangeEvent, MouseEvent } from 'react';
import { SimpleContext } from '../../context/SimpleContext';
import './SendMoney.scss';

export default function SendMoney() {
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);
  const [recipient, setRecipient] = useState('');
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
    accountActivity: {
      timeStamp: string;
      from?: string;
      to?: string;
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

  function sendRecipientMoney() {
    if (recipient.length < 1 || amount.length < 1 || currency.length < 1) {
      alert('All fields must be complete');
      return;
    } else if (!filterAmountInput()) {
      alert('Only use numbers for amount');
      return;
    }
    //this function will first get recipients account balance
    function recipientGetInfo() {
      fetch(`http://localhost:3030/account/${recipient}`)
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            alert(response.error);
          } else {
            setGetRecipientInfo(response);
          }
        });
    }
    console.log(getRecipientInfo);
    let verifiedNumbers = 0;
    //this function increases the balance
    function newRecipientBalance() {
      const amountArray = amount.split('');
      const numberVerify = amountArray.map((item: string) => parseInt(item));
      if (numberVerify.every((item: unknown) => !Number.isNaN(item))) {
        verifiedNumbers = Number(numberVerify.join(''));
        const sum = verifiedNumbers + getRecipientInfo.accountBalance;
        return sum;
      } else {
        return false;
      }
    }

    recipientGetInfo();
    newRecipientBalance();

    if (verifiedNumbers && sendAccount.accountBalance < verifiedNumbers) {
      alert('sorry, insufficient funds. Please choose another account or amount to send');
      return;
    }

    if (!newRecipientBalance) {
      alert('Only use numbers for the amount');
      return;
    }

    getRecipientInfo.accountActivity.push({
      timeStamp: new Date().toLocaleString(),
      from: `${currentOwner?.firstName} ${currentOwner?.lastName}`,
      type: 'deposit',
      amount: Number(amount),
      currency: currency
    });
    console.log('receiverActivity', getRecipientInfo.accountActivity);
    function firstPut() {
      const config = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          recipient: `${recipient}`,
          accountBalance: newRecipientBalance(),
          accountActivity: getRecipientInfo.accountActivity
        })
      };

      fetch(`http://localhost:3030/account`, config)
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            console.log(response);
          }
        });
    }
    firstPut();
    const newBalanceForSender = sendAccount.accountBalance - verifiedNumbers;

    function secondPut() {
      sendAccount.accountActivity.push({
        timeStamp: new Date().toLocaleString(),
        to: recipient,
        type: 'payment',
        amount: Number(amount),
        currency: currency
      });

      console.log(sendAccount.accountActivity);
      const config2 = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          recipient: sendAccount._id,
          accountBalance: newBalanceForSender,
          accountActivity: sendAccount.accountActivity
        })
      };
      fetch(`http://localhost:3030/account`, config2)
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            console.log(response);
          }
        });
    }
    secondPut();
    setRecipient('');
    setAmount('');
    setCurrency('');
  }

  // setGetRecipientInfo(getRecipientInfo.accountBalance:newRecipientBalance)
  // this is the list item onclick
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
                  value={recipient}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
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
