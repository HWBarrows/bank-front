import React, { useContext, useState, ChangeEvent, MouseEvent } from 'react';
import { SimpleContext } from '../../context/SimpleContext';
import './SendMoney.scss';

export default function SendMoney() {
  const { currentOwner } = useContext(SimpleContext);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [confirmInfo, setConfirmInfo] = useState(false);

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

  function accountInfoSendMoney(e: MouseEvent<HTMLLIElement>) {
    const target = e.target as Element;

    fetch(`http://localhost:3030/account/${target.id}`)
      .then((response) => response.json())
      .then((response) => setSendAccount(response));
  }

  function recipientGetInfo() {
    if (recipient.length < 1 || amount.length < 1 || currency.length < 1) {
      alert('All fields must be complete');
      return;
    } else if (!filterAmountInput()) {
      alert('Only use numbers for amount');
      return;
    }
    fetch(`http://localhost:3030/account/${recipient}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          alert(response.error);
        } else {
          setGetRecipientInfo(response);
          setConfirmInfo(true);
        }
      });
  }

  function sanitizeAmount() {
    if (!filterAmountInput()) {
      alert('Only use numbers for amount');
      return NaN;
    }
    const amountArray = amount.split('');
    const numberVerify = amountArray.map((item: string) => parseInt(item));
    if (numberVerify.filter((item: unknown) => Number.isNaN(item)).length > 0) {
      return NaN;
    } else {
      return Number(numberVerify.join(''));
    }
  }

  function newRecipientBalance() {
    return sanitizeAmount() + getRecipientInfo.accountBalance;
  }

  function newSenderBalance() {
    return sendAccount.accountBalance - sanitizeAmount();
  }

  function makeRecipientConfig() {
    if (Number.isNaN(sanitizeAmount())) {
      alert('Only use numbers for amount');
      return null;
    } else if (sanitizeAmount() > sendAccount.accountBalance) {
      alert(
        'Insufficient funds, please choose a different amount to send or use a different account'
      );
      return null;
    } else {
      getRecipientInfo.accountActivity.push({
        timeStamp: new Date().toLocaleString(),
        from: `${currentOwner?.firstName} ${currentOwner?.lastName}`,
        type: 'deposit',
        amount: sanitizeAmount(),
        currency: currency
      });

      const config = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          recipient: getRecipientInfo._id,
          accountBalance: newRecipientBalance(),
          accountActivity: getRecipientInfo.accountActivity
        })
      };
      return config;
    }
  }

  function makeSenderConfig() {
    if (!Number.isNaN(sanitizeAmount())) {
      sendAccount.accountActivity.push({
        timeStamp: new Date().toLocaleString(),
        to: recipient,
        type: 'payment',
        amount: sanitizeAmount(),
        currency: currency
      });

      const config = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          recipient: sendAccount._id,
          accountBalance: newSenderBalance(),
          accountActivity: sendAccount.accountActivity
        })
      };
      return config;
    }
    return null;
  }

  function sendRecipientFunds() {
    if (makeRecipientConfig() || makeSenderConfig()) {
      const recipientConfig = makeRecipientConfig() || undefined;
      fetch(`http://localhost:3030/account`, recipientConfig)
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            console.log(response);
          }
        });

      const senderConfig = makeSenderConfig() || undefined;
      fetch(`http://localhost:3030/account`, senderConfig)
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            console.log(response);
          }
        });

      setRecipient('');
      setAmount('');
      setCurrency('');
      setConfirmInfo(false);
    }
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
            <button onClick={() => recipientGetInfo()}>Test stuff</button>
          </div>
          {!filterAmountInput() && (
            <div className="warning">
              <p>Enter numbers only</p>
            </div>
          )}
          {confirmInfo && (
            <div>
              <p>Please confirm the information is correct</p>
              <p>
                Sending {amount} {currency}
              </p>
              <p>To account # {getRecipientInfo._id}</p>
              {/* <button onClick={() => setConfirmInfo(false)}> Edit </button> */}
              <p>If all information is correct, please click send to complete the transaction</p>
              <button onClick={() => sendRecipientFunds()}>Send</button>
            </div>
          )}
        </div>
      )}
      {!currentOwner && <div>Access Denied</div>}
    </div>
  );
}
