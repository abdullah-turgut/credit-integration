import Layout from '../components/Layout';
import { Table } from 'flowbite-react';
import DataGrid from '../components/DataGrid';
import { TableHeadCell } from 'flowbite-react/lib/esm/components/Table/TableHeadCell';
import { TableBody } from 'flowbite-react/lib/esm/components/Table/TableBody';

export default function SuperAdmin() {
  return (
    <div className="flex">
      <div className="ml-[300px] w-full relative min-h-screen">
        <DataGrid />
      </div>
      <Layout />
    </div>
  );
}
