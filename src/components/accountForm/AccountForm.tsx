import { useState, useContext } from 'react';
import { SimpleContext } from '../../context/SimpleContext';
import './AccountForm.scss';

export default function AccountForm() {
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);
  const [accountType, setAccountType] = useState('');
  const [accountCurrency, setAccountCurrency] = useState('');
  const [selectedType, setSelectedType] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(false);
  const [activeChecking, setActiveChecking] = useState('');
  const [activeSaving, setActiveSaving] = useState('');

  function getAccountType(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setAccountType(value);
    setSelectedType(true);
  }

  function getAccountCurrency(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setAccountCurrency(value);
    setSelectedCurrency(true);
  }

  function addNewAccount() {
    console.log(currentOwner?._id);
    const balance = Math.floor(Math.random() * 10000) + 200;
    if (!accountCurrency || !accountType) {
      alert('please select a currency or type');
      return null;
    } else if (currentOwner) {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accountOwner: `${currentOwner._id}`,
          accountCurrency: 'EUR',
          accountType: 'checking',
          accountBalance: balance
        })
      };
      fetch(`http://localhost:3030/account`, config)
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            alert(response.error);
            return null;
          }
          console.log(response);
          if (setCurrentOwner && response._id) {
            setCurrentOwner({
              ...currentOwner,
              accounts: [...currentOwner.accounts, response._id]
            });
          }
          setAccountCurrency('');
          setAccountType('');
          setSelectedType(false);
          setSelectedCurrency(false);
        });

      // fetch(`http://localhost:3030/accountOwner/${currentOwner._id}`)
      //   .then((response) => response.json())
      //   .then((response) => {
      //     if (response.error) {
      //       alert(response.error);
      //     } else if (setCurrentOwner) {
      //       setCurrentOwner(response);
      //     }
      //   });
    }
  }
  return (
    <div className="accountFormWrapper">
      <p>
        Choose an account type and default currency. Your balance will be a randomly chosen number.
        Good luck!
      </p>
      <form>
        <div className="accountTypeWrapper">
          <label>
            <h4>Please select an account type</h4>
            <select className="dropdownType" onChange={getAccountType} defaultValue={'DEFAULT'}>
              <option value={'DEFAULT'} disabled>
                Choose one
              </option>
              <option value="checking">checking</option>
              <option value="savings">savings</option>
            </select>
          </label>
        </div>

        <div className="accountCurrencyWrapper">
          <label>
            <h4>Please select a default currency</h4>
            <select
              className="dropdownCurrency"
              onChange={getAccountCurrency}
              defaultValue={'DEFAULT'}>
              <option value={'DEFAULT'} disabled>
                Choose one
              </option>
              <option value="USD">United States Dollar</option>
              <option value="EUR">Euro</option>
              <option value="GBP">British Pound Sterling</option>
              <option value="CHF">Swiss Franc</option>
            </select>
          </label>
        </div>
      </form>
      {selectedCurrency && selectedType && (
        <div className="confirmation">
          <p>
            You have selected a <span>{accountType}</span> account with {accountCurrency} as your
            default currency
          </p>
          <p>If all details are correct, click the submit button below </p>
          <button onClick={() => addNewAccount()}>submit</button>
        </div>
      )}
    </div>
  );
}
