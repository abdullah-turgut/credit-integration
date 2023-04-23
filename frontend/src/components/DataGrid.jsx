import React, { useState, useEffect } from 'react';
import { MainContext, useContext } from '../contexts/MainContext';

export default function DataGrid() {
  const { rawData, setRawData } = useContext(MainContext);

  async function getData() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  getData();

  return <div>DataGrid</div>;
}
