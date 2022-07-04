import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type setValue = (value: any) => void;
interface AppContextInterface {
  currentOwner: {
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
  setCurrentOwner: setValue;
  BoxProps: BoxProps;
}

type BoxProps = {
  children: React.ReactNode;
};

export const SimpleContext = React.createContext<Partial<AppContextInterface>>({});

const SimpleContextProvider = (props: BoxProps) => {
  const [currentOwner, setCurrentOwner] = React.useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    primaryAddress: {
      street: '',
      zipcode: '',
      city: '',
      country: ''
    },
    password: '',
    accounts: [''],
    createdAt: '',
    updatedAt: '',
    __v: 0
  });
  return (
    <SimpleContext.Provider value={{ currentOwner, setCurrentOwner }}>
      {props.children}
    </SimpleContext.Provider>
  );
};

export default SimpleContextProvider;