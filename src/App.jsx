import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './index.css';
import Dashboard from './pages/Dashboard';
  

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5173/data')
      .then(response => {
        console.log("Fetching data");
        setData(response.data);
        console.log(response)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(true);
      });
  }, []);
  

  return (
    <div className="app">
      <div>
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
