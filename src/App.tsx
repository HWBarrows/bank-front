import './App.scss';
import Login from './components/login/Login';
import SimpleContextProvider from './context/SimpleContext';

export default function App() {
  return (
    <div>
      <SimpleContextProvider>
        <Login />
      </SimpleContextProvider>
    </div>
  );
}
