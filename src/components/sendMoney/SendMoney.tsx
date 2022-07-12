import React, { useContext, useState, useReducer, ChangeEvent } from 'react';
import { SimpleContext } from '../../context/SimpleContext';

export default function SendMoney() {
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);
  const [sendAccount, setSendAccount] = useState('');

  // function getRecieverInfo(){
  //   Make a fetch request to the account of the reciever to then send the patch request
  // }

  function formReducer(
    state: {
      receiverId: string;
      amount: string;
      currency: string;
    },
    action: { type: unknown; field: string; payload: string }
  ) {
    switch (action.type) {
      case 'inputSubmit':
        return {
          ...state,
          [action.field]: action.payload
        };
      default:
        return state;
    }
  }

  const initialState = {
    receiverId: '',
    amount: '',
    currency: ''
  };

  const [formState, dispatch] = useReducer(formReducer, initialState);

  function getInputData(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'inputSubmit',
      field: e.target.name,
      payload: e.target.value
    });
  }

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

  function accountInfoSendMoney() {
    // const target = e.target as Element;

    fetch(`http://localhost:3030/account/${formState.receiverId}`)
      .then((response) => response.json())
      .then((response) => setSendAccount(response));
  }
  console.log(formState);
  return (
    <div>
      <label>
        Please enter the account number for the person receiving the funds
        <input
          type="text"
          name="receiverId"
          placeholder="where is it going?"
          value={formState.receiverId}
          onChange={(e) => getInputData(e)}
        />
      </label>
      <label>
        Please enter the amount to send
        <input
          type="text"
          name="amount"
          placeholder="how much"
          value={formState.amount}
          onChange={(e) => getInputData(e)}
        />
      </label>
      <input type="text" placeholder="which currency?" />
    </div>
  );
}
