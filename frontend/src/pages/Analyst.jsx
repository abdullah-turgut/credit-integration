import { MainContext, useContext } from '../contexts/MainContext';
import Layout from '../components/Layout';
export default function Analyst() {
  const { user } = useContext(MainContext);
  return (
    <div>
      <Layout />
    </div>
  );
}
