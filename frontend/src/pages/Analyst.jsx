import Layout from '../components/Layout';
import Charts from '../components/Charts';
export default function Analyst() {
  return (
    <div className="flex">
      <div className="ml-[300px] w-full relative min-h-screen">
        <Charts />
      </div>
      <Layout />
    </div>
  );
}
