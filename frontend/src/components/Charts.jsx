import React, { useEffect, useState } from 'react';
import { MainContext, useContext } from '../contexts/MainContext';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from 'chart.js';
import { Pie, Line, PolarArea, Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  const [educationData, setEducationData] = useState([]);
  const [approvalData, setApprovalData] = useState([]);
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
      .then((res) =>
        setEducationData((preVal) => {
          return {
            labels: [
              'Doktora',
              'Lisans - 4 Yıllık Üniversite',
              'Yüksek Lisans',
              'Ön Lisans - 2 Yıllık Üniversite',
              'Lise',
            ],
            datasets: [
              {
                label: 'Sayı',
                data: [
                  dat.filter((ent) => ent.education === 'Doktora').length,
                  dat.filter(
                    (ent) => ent.education === 'Lisans - 4 Yıllık Üniversite'
                  ).length,
                  dat.filter((ent) => ent.education === 'Yüksek Lisans').length,
                  dat.filter(
                    (ent) => ent.education === 'Ön Lisans - 2 Yıllık Üniversite'
                  ).length,
                  dat.filter((ent) => ent.education === 'Lise').length,
                ],
                backgroundColor: [
                  '#fd7f6f',
                  '#7eb0d5',
                  '#b2e061',
                  '#beb9db',
                  '#ffb55a',
                ],
              },
            ],
          };
        })
      )
      .then((res) =>
        setApprovalData((preVal) => {
          return {
            labels: ['Olumlu', 'Olumsuz'],
            datasets: [
              {
                label: 'Sayı',
                data: [
                  dat.filter(
                    (ent) => ent.startYear >= 2015 && ent.education !== 'Lise'
                  ).length,
                  dat.filter(
                    (ent) => ent.startYear < 2015 || ent.education === 'Lise'
                  ).length,
                ],
                backgroundColor: ['#5ad45a', '#e60049'],
              },
            ],
          };
        })
      )
      .then((res) => setLoad(true));
  }, [load]);

  console.log(yearData);

  return (
    <div className="flex h-screen justify-between gap-x-40 px-20 pt-20 w-full flex-wrap">
      {load ? (
        <div className="flex flex-col w-1/4 gap-y-4">
          <Pie data={sexData} className="w-1/2" />
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
      {load ? (
        <div className="flex flex-col w-1/3 gap-y-4">
          <PolarArea data={educationData} />
          <p className="font-semibold text-center">
            Başvuranların eğitim düzeyine göre dağılımı
          </p>
        </div>
      ) : null}
      {load ? (
        <div className="flex flex-col w-1/2 gap-y-4">
          <Bar data={approvalData} />
          <p className="font-semibold text-center">
            Başvuranların onay durumlarına göre dağılımı
          </p>
        </div>
      ) : null}
    </div>
  );
}
