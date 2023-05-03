import React, { useEffect, useState } from 'react';
import { MainContext, useContext } from '../contexts/MainContext';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
    },
  },
};
export default function Charts() {
  const { dat, setDat } = useContext(MainContext);
  const [sexData, setSexData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setDat((preval) => []);

    axios
      .get('http://localhost:1337/api/entries?sort=entry_id', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        res.data.data.map((item) => {
          setDat((preVal) => [...preVal, { ...item.attributes, id: item.id }]);
        });
      })
      .then((res) =>
        setSexData((preVal) => {
          return {
            labels: ['Erkek', 'Kadın'],
            datasets: [
              {
                label: 'Sayı',
                data: [
                  dat.filter((ent) => ent.sex === 'Erkek').length,
                  dat.filter((ent) => ent.sex === 'Kadın').length,
                ],
                backgroundColor: ['#ffb55a', '#bd7ebe'],
              },
            ],
          };
        })
      )
      .then((res) =>
        setYearData((preVal) => {
          let labels = [
            ...new Set(dat.map((ent) => ent.startYear).sort((a, b) => a - b)),
          ];
          return {
            labels: labels,
            datasets: [
              {
                label: 'Sayı',
                data: labels.map(
                  (year) => dat.filter((ent) => ent.startYear == year).length
                ),
                backgroundColor: ['#ffb55a'],
                borderColor: '#ffb55a',
              },
            ],
          };
        })
      )
      .then((res) => setLoad(true));
  }, [load]);

  console.log(yearData);

  return (
    <div className="flex h-screen justify-between px-20 pt-20">
      {load ? (
        <div className="flex flex-col w-1/4 gap-y-4">
          <Pie data={sexData} />
          <p className="font-semibold text-center">
            Başvuranların cinsiyete göre dağılımı
          </p>
        </div>
      ) : null}
      {load ? (
        <div className="flex flex-col w-1/2 gap-y-4">
          <Line data={yearData} options={options} />
          <p className="font-semibold text-center">
            Başvuranların işe başlama tarihlerine göre dağılımı
          </p>
        </div>
      ) : null}
    </div>
  );
}
