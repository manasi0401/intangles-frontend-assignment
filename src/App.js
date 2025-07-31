import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import DataTable from './components/DataTable';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse('/data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        setData(result.data);
      }
    });
  }, []);

  return (
    <div className="App">
      <h1 className="main-heading">Event Clustering Results</h1>
      <DataTable data={data} />
    </div>
  );
}

export default App;
