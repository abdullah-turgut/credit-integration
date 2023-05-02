import React, { useState, useEffect } from 'react';
import { MainContext, useContext } from '../contexts/MainContext';
import axios from 'axios';
import { formatData } from '../helpers/dataFormat';
import { successRate, preferOrder } from '../helpers/calculateScore';
import { Table, Spinner } from 'flowbite-react';
import { FcSearch } from 'react-icons/fc';
import { FaSyncAlt, FaPaperPlane } from 'react-icons/fa';
import { enDat } from '../helpers/data';

export default function DataGrid() {
  const [isLoading, setLoading] = useState(false);
  const {
    typeformData,
    setTypeFormData,
    formattedData,
    setFormattedData,
    user,
    dat,
    setDat,
  } = useContext(MainContext);

  useEffect(() => {
    setDat((preval) => []);
    axios
      .get('http://localhost:1337/api/entries?sort=entry_id', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjgyNzczNTM0LCJleHAiOjE2ODUzNjU1MzR9.8XvpY1iNJXCwCB4-UTzgdjOL8av4i8aEWeiqzqz0GzU',
        },
      })
      .then((res) => {
        res.data.data.map((item) => {
          setDat((preVal) => [...preVal, { ...item.attributes, id: item.id }]);
        });
      })
      .then((res) => setFormattedData(formatData(dat)))
      .then((res) => setLoading(true));
  }, [isLoading]);

  if (!isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2">
        <Spinner color="purple" aria-label="Info spinner example" size="xl" />
      </div>
    );
  }

  console.log(dat);
  console.log(formattedData);

  // useEffect(() => {
  //   enDat
  //     .sort((a, b) => (a['#'] > b['#'] ? 1 : b['#'] > a['#'] ? -1 : 0))
  //     .map((item, i) => {
  //       let data = {
  //         data: {
  //           entry_id: item['#'],
  //           name_surname: item['İsim Soyisim'],
  //           field: item['Sektör'],
  //           sectorScore: item['SectorScore'],
  //           credit_type: item['Hangi Kredi Ürünüyle İlgileniyorsun'],
  //           sex: item['Cinsiyet'],
  //           email: item['E-Posta'],
  //           source: item['Kaynak'],
  //           tel: item['Telefon'],
  //           age: item['Kaç yaşındasın?'],
  //           startYear: item['Çalışmaya ilk başladığın yıl nedir?'],
  //           job: item['Hangi Pozisyonda Çalışıyorsun?'],
  //           PS: item['PS'],
  //           education: item['Son Mezuniyet'],
  //           university: item['Üniversite'],
  //           avg: Boolean(item["Mezuniyet Ortalaman 3.00'dan yüksek mi?"]),
  //           startDate: item['Start Date (UTC)'],
  //           submitDate: item['Submit Date (UTC)'],
  //           network_id: item['Network ID'],
  //           conditions: Boolean(item['Ön Şartları Okudum']),
  //         },
  //       };

  //       if (i >= 2500 && i <= 3000) {
  //         axios
  //           .post(`http://localhost:1337/api/entries`, data, {
  //             headers: {
  //               Authorization:
  //                 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjgyNzczNTM0LCJleHAiOjE2ODUzNjU1MzR9.8XvpY1iNJXCwCB4-UTzgdjOL8av4i8aEWeiqzqz0GzU',
  //             },
  //           })
  //           .then((res) => res.data);
  //       }
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:1337/api/infos', {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjgyNzczNTM0LCJleHAiOjE2ODUzNjU1MzR9.8XvpY1iNJXCwCB4-UTzgdjOL8av4i8aEWeiqzqz0GzU`,
  //       },
  //     })
  //     .then((res) => {
  //       let data = res.data.data.map((item) => item.attributes.data);
  //       let x = [];
  //       for (let i = 0; i < data.length; i++) {
  //         x.push(...data[i]);
  //       }
  //       setTypeFormData(x);
  //       setFormattedData(formatData(dat));
  //       setLoading(true);
  //     });
  // }, [isLoading]);

  // useEffect(() => {
  //   axios.get('http://localhost:9000/api/responses').then((res) => {
  //     setTypeFormData(res.data);
  //     setFormattedData(formatData(typeformData));
  //     setLoading(true);
  //   });
  // }, [isLoading]); //eslint-disable-line

  const entriesEl = formattedData.map((entry, i) => {
    return (
      <Table.Row
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
        key={entry.id}
      >
        <Table.Cell>{i + 1}</Table.Cell>
        <Table.Cell>{entry.name_surname}</Table.Cell>
        <Table.Cell>{entry.startYear}</Table.Cell>
        <Table.Cell>{entry.education}</Table.Cell>
        <Table.Cell>{entry.field}</Table.Cell>
        <Table.Cell>{entry.job}</Table.Cell>
        <Table.Cell>{entry.creditScore}</Table.Cell>
        <Table.Cell>{successRate(entry.creditScore)}</Table.Cell>
        <Table.Cell>
          {preferOrder(entry.field, entry.job, entry.creditScore)}
        </Table.Cell>
        <Table.Cell>
          <FcSearch className="cursor-pointer hover:scale-125" />
        </Table.Cell>
      </Table.Row>
    );
  });

  function sendToPipeDrive(arr) {
    arr.map((entry, i) => {
      axios
        .post(
          'https://api.pipedrive.com/v1/deals?api_token=b7be953a837f6b7edcdb056873ba3d43180f58ef',
          {
            title: `${entry.name_surname} - KS:${
              entry.creditScore
            } - RD:${successRate(entry.creditScore)} - TS:${preferOrder(
              entry.field,
              entry.job,
              entry.creditScore
            )}`,
          }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    });
  }

  return (
    <div className="relative h-screen">
      <div className="overflow-y-scroll h-5/6 bg-slate-300 ">
        <Table striped={true}>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>İsim Soyisim</Table.HeadCell>
            <Table.HeadCell>İşe Başlama Yılı</Table.HeadCell>
            <Table.HeadCell>Eğitim Düzeyi</Table.HeadCell>
            <Table.HeadCell>Sektör</Table.HeadCell>
            <Table.HeadCell>Meslek</Table.HeadCell>
            <Table.HeadCell>Kredi Puanı</Table.HeadCell>
            <Table.HeadCell>Risk Düzeyi</Table.HeadCell>
            <Table.HeadCell>Tercih Sırası</Table.HeadCell>
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
            onClick={() => sendToPipeDrive(formattedData)}
          />
          <p>PipeDrive Gönder</p>
        </div>
      </div>
    </div>
  );
}
