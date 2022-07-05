import { useContext } from 'react';
import { SimpleContext } from '../../context/SimpleContext';
import './Home.scss';

export default function Home() {
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);
  console.log(currentOwner);

  return <div className="homeWrapper">Hola von Hause</div>;
}
