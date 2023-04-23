import React, { useState, useEffect } from 'react';
import { MainContext, useContext } from '../contexts/MainContext';
import axios from 'axios';

export default function DataGrid() {
  const { rawData, setRawData } = useContext(MainContext);

  useEffect(() => {
    axios
      .get('http://localhost:9000/api/responses')
      .then((res) => console.log(res));
  });

  return <div>DataGrid</div>;
}
