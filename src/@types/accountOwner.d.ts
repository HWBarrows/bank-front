export interface IAccountOwner {
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
}

export type accountOwner = {
  accountOwner:IAccountOwner;
  saveAccountOwner: (accountOwner: IAccountOwner) => void;
};

//export const currentAccountOwner: currentAccountOwnerType;
//   currentAccountOwner: ICurrentAccountOwner;
//   setCurrentAccountOwner: (currentAccountOwner: ICurrentAccountOwner) => void;
// // };
