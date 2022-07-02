import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type setValue = (value: any) => void;
interface AppContextInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueA: any;
  setValueA: setValue;
  BoxProps: BoxProps;
}

type BoxProps = {
  children: React.ReactNode;
};

export const SimpleContext = React.createContext<Partial<AppContextInterface>>({});

const SimpleContextProvider = (props: BoxProps) => {
  const [valueA, setValueA] = React.useState('stringStuff');
  return (
    <SimpleContext.Provider value={{ valueA, setValueA }}>{props.children}</SimpleContext.Provider>
  );
};

export default SimpleContextProvider;
