import Layout from '../components/Layout';
import { Table } from 'flowbite-react';
import DataGrid from '../components/DataGrid';

export default function SuperAdmin() {
  return (
    <div className="flex">
      <div className="ml-[300px] w-full">
        <DataGrid />
      </div>
      <Layout />
    </div>
  );
}
