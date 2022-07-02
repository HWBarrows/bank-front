// // import './App.css';
// // function App() {
// //   return <div>Hi there</div>;
// // }

// // export default App;
import * as React from 'react';
// import { AccountContext } from './context/AccountContext';
// import { IAccountOwner, accountOwnerType } from '../src/@types/accountOwner';
import Login from './components/login/Login';
import SimpleContextProvider from './context/SimpleContext';
// //export const AccountContext = React.createContext<accountOwnerType | null>(null);

// export default function App() {
//   const fetchedOwner: IAccountOwner = {
//     _id: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     primaryAddress: {
//       street: '',
//       zipcode: '',
//       city: '',
//       country: ''
//     },
//     password: '',
//     accounts: [],
//     createdAt: '',
//     updatedAt: '',
//     __v: 0
//   };
//   const [accountOwner, setAccountOwner] = React.useState({
//     _id: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     primaryAddress: {
//       street: '',
//       zipcode: '',
//       city: '',
//       country: ''
//     },
//     password: '',
//     accounts: [''],
//     createdAt: '',
//     updatedAt: '',
//     __v: 0
//   });

//   // const getAccountOwner = (accountOwner: IAccountOwner) => {
//     const newAccountOwner: IAccountOwner = {
//       _id: '',
//       firstName: '',
//       lastName: '',
//       email: '',
//       primaryAddress: {
//         street: '',
//         zipcode: '',
//         city: '',
//         country: ''
//       },
//       password: '',
//       accounts: [''],
//       createdAt: '',
//       updatedAt: '',
//       __v: 0
//     };
//     //setAccountOwner(newAccountOwner);
//   // };
//   return (
//     <AccountContext.Provider value={{ accountOwner, setAccountOwner }}>
//       hi from app
//       <Login />
//     </AccountContext.Provider>
//   );
// }

// // export default AccountProvider;
export default function App() {
  return (
    <div>
      Hi again from app
      <SimpleContextProvider>
        <Login />
      </SimpleContextProvider>
    </div>
  );
}
