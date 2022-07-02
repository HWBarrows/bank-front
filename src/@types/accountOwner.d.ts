export interface IAccountOwner {
  accountOwner: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    primaryAddress: {
      street: string;
      zipcode: string;
      city: string;
      country: string;
    };
    password: string;
    accounts: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  setAccountOwner: (accountOwner: IAccountOwner) => void;
}

export type accountOwnerType = {
  accountOwner: IAccountOwner;
  setAccountOwner: (accountOwner: IAccountOwner) => void;
};

//export const currentAccountOwner: currentAccountOwnerType;
//   currentAccountOwner: ICurrentAccountOwner;
//   setCurrentAccountOwner: (currentAccountOwner: ICurrentAccountOwner) => void;
// // };
