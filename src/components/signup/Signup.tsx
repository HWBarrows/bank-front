import { useContext } from 'react';
import { SimpleContext } from '../../context/SimpleContext';

export default function Signup() {
  const { currentOwner, setCurrentOwner } = useContext(SimpleContext);
  console.log({ signup: currentOwner });
  return <div>Signup here</div>;
}
