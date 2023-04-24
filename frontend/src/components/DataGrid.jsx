import React, { useState, useEffect } from 'react';
import { MainContext, useContext } from '../contexts/MainContext';
import axios from 'axios';
import { formatData } from '../helpers/dataFormat';
import { Table, Spinner } from 'flowbite-react';
import { FcSearch } from 'react-icons/fc';
import { FaSyncAlt, FaPaperPlane } from 'react-icons/fa';

export default function DataGrid() {
  const [isLoading, setLoading] = useState(false);
  const {
    typeformData,
    setTypeFormData,
    formattedData,
    setFormattedData,
    user,
  } = useContext(MainContext);

  useEffect(() => {
    axios.get('http://localhost:9000/api/responses').then((res) => {
      setTypeFormData(res.data);
      setFormattedData(formatData(typeformData));
      setLoading(true);
    });
  }, [isLoading]); //eslint-disable-line

  const entriesEl = formattedData.map((entry) => {
    return (
      <Table.Row
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
        key={entry.entryId}
      >
        <Table.Cell className="">{entry.startYear}</Table.Cell>
        <Table.Cell>{entry.education}</Table.Cell>
        <Table.Cell>{entry.field}</Table.Cell>
        <Table.Cell>{entry.job}</Table.Cell>
        <Table.Cell>
          {entry.startYear >= 2015 && entry.education === 'Lisans' ? (
            <span className="font-medium text-emerald-500">Olumlu</span>
          ) : (
            <span className="font-medium text-rose-500">Ret</span>
          )}
        </Table.Cell>
        <Table.Cell>
          <FcSearch className="cursor-pointer hover:scale-125" />
        </Table.Cell>
      </Table.Row>
    );
  });

  console.log(entriesEl);

  if (!isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2">
        <Spinner color="purple" aria-label="Info spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <div className="overflow-y-scroll h-5/6 bg-slate-300 ">
        <Table striped={true}>
          <Table.Head>
            <Table.HeadCell>İşe Başlama Yılı</Table.HeadCell>
            <Table.HeadCell>Eğitim Düzeyi</Table.HeadCell>
            <Table.HeadCell>Sektör</Table.HeadCell>
            <Table.HeadCell>Meslek</Table.HeadCell>
            <Table.HeadCell>Kredi Durumu</Table.HeadCell>
            <Table.HeadCell>GÖRÜNTÜLE</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">{entriesEl}</Table.Body>
        </Table>
      </div>
      <div className="absolute z-10 flex justify-center items-center gap-x-20 w-full shadow-inner  shadow-slate-400 h-1/6 bottom-0 font-semibold">
        <div className="flex flex-col items-center gap-y-4">
          <FaSyncAlt
            size={30}
            className="cursor-pointer hover:scale-110 text-emerald-600"
          />
          <p>TypeForm Data</p>
        </div>
        <div className="flex flex-col items-center gap-y-4">
          <FaPaperPlane
            size={30}
            className="cursor-pointer hover:scale-110 text-sky-600"
          />
          <p>PipeDrive Gönder</p>
        </div>
      </div>
    </div>
  );
}
