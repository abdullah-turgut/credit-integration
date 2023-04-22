import { MainContext, useContext } from '../contexts/MainContext';

export default function SuperAdmin() {
  const { user } = useContext(MainContext);
  console.log(user);
  return <div>SuperAdmin</div>;
}
