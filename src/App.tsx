import './App.scss';
import SimpleContextProvider from './context/SimpleContext';
import BankRoutes from '../src/components/bankRoutes/BankRoutes';

export default function App() {
  return (
    <div className="appWrapper">
      <SimpleContextProvider>
        <BankRoutes />
      </SimpleContextProvider>
    </div>
  );
}
