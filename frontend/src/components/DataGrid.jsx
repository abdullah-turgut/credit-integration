import React, { useState, useEffect } from 'react';
import { MainContext, useContext } from '../contexts/MainContext';
import axios from 'axios';
import { formatData } from '../helpers/dataFormat';

export default function DataGrid() {
  const { typeformData, setTypeFormData } = useContext(MainContext);

  useEffect(() => {
    axios
      .get('http://localhost:9000/api/responses')
      .then((res) => setTypeFormData(res.data));
  }, []); //eslint-disable-line

  console.log(typeformData);

  console.log(formatData(typeformData));

  return <div>DataGrid</div>;
}
