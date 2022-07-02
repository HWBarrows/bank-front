import * as React from 'react';
import { accountOwnerType, IAccountOwner } from '../@types/accountOwner';

export const AccountContext = React.createContext({} as IAccountOwner);
//export const AccountContext = React.createContext<accountOwnerType | null>(null);

// const AccountProvider: React.FC<React.ReactNode> = ({ props }) => {
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
//   const [accountOwner, setAccountOwner] = React.useState<IAccountOwner>(fetchedOwner);

//   const getAccountOwner = (accountOwner: IAccountOwner) => {
//     const newAccountOwner: IAccountOwner = {
//       _id: accountOwner._id,
//       firstName: accountOwner.firstName,
//       lastName: accountOwner.lastName,
//       email: accountOwner.email,
//       primaryAddress: {
//         street: accountOwner.primaryAddress.street,
//         zipcode: accountOwner.primaryAddress.zipcode,
//         city: accountOwner.primaryAddress.city,
//         country: accountOwner.primaryAddress.country
//       },
//       password: accountOwner.password,
//       accounts: accountOwner.accounts,
//       createdAt: accountOwner.createdAt,
//       updatedAt: accountOwner.updatedAt,
//       __v: 0
//     };
//     setAccountOwner(newAccountOwner);
//   };
//   return (
//     <AccountContext.Provider value={{ accountOwner, getAccountOwner }}>
//       {children}
//     </AccountContext.Provider>
//   );
// };

//export default AccountProvider;

// export default function Context() {
//   return <div>hi from context</div>;
// }
