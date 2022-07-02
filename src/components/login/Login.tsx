import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { SimpleContext } from '../../context/SimpleContext';

export default function Login() {
  const [effected, setEffected] = useState('stop');
  const { valueA, setValueA } = useContext(SimpleContext);

  useEffect(() => {
    if (setValueA) {
      setValueA({ testing: 'test' });
    }
  }, [effected]);

  // const accountOwner = useContext(AccountContext);
  // console.log(accountOwner);
  // const { accountOwner, getAccountOwner } = useContext(AccountContext) as accountOwnerType;
  // getAccountOwner({
  //   _id: 'stuff',
  //   firstName: 'Hallie',
  //   lastName: 'Gallie',
  //   email: 'dancingqueen@aol.com',
  //   primaryAddress: {
  //     street: '127 Clifton Place',
  //     zipcode: '44896',
  //     city: 'Boston',
  //     country: 'United States'
  //   },
  //   password: 'randomstuff',
  //   accounts: ['none'],
  //   createdAt: 'now',
  //   updatedAt: 'later',
  //   __v: 0
  // });
  console.log(valueA);
  return (
    <div>
      <form>
        <label>
          Please enter your email address
          <input type="text" placeholder="example@email.com" />
        </label>
      </form>
      {/* <p> {valueA} </p> */}
    </div>
  );
}
