import { MainContext, useContext } from '../contexts/MainContext';
import Layout from '../components/Layout';

export default function SuperAdmin() {
  const { user } = useContext(MainContext);

  console.log(user);

  return (
    <div>
      <Layout />
    </div>
  );
}
