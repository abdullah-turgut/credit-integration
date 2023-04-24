import React, { useState, useEffect } from 'react';
import { MainContext, useContext } from '../contexts/MainContext';
import axios from 'axios';
import { formatData } from '../helpers/dataFormat';
import { Table, Spinner } from 'flowbite-react';
import { FcSearch } from 'react-icons/fc';

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
          {entry.startYear >= 2015 && entry.education === 'Lisans'
            ? 'Olumlu'
            : 'Ret'}
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
    <>
      <Table striped={true} hoverable={true}>
        <Table.Head>
          <Table.HeadCell>İşe Başlama Yılı</Table.HeadCell>
          <Table.HeadCell>Eğitim Düzeyi</Table.HeadCell>
          <Table.HeadCell>Sektör</Table.HeadCell>
          <Table.HeadCell>Meslek</Table.HeadCell>
          <Table.HeadCell>Kredi Durumu</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">{entriesEl}</Table.Body>
      </Table>
    </>
  );
}
