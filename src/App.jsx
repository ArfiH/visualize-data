import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './index.css';
import Dashboard from './pages/Dashboard';
  

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch('http://localhost:5173/data')
  //     .then(response => response.json())
  //     .then(data => setData(data))  
  //     .catch(error => console.error(error));
  // }, []);

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app">
  
      <div className="navbar">
        <div className="hamburger" onClick={toggleSidebar}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <input type="text" placeholder="Search" />
        </div>
        <div className="profile">
          <img src="/profile.jpg" alt="Profile" />
          {/* Mongo data */}
          <h1>Data from MongoDB</h1>
            <h3> {loading ? 'Loading...' : 'Loaded' } </h3>
            <ul>
              {data.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
        </div>
      </div>
      <div className={`sidebar ${sidebarOpen ? 'mobile visible' : 'mobile'}`}>
        <div className="logo">Dashboard</div>
        <ul>
          <li><a href="/analytics">Analytics</a></li>
          <li><a href="/crm">CRM</a></li>
          <li><a href="/ecommerce">Ecommerce</a></li>
          <li><a href="/academy">Academy</a></li>
          <li><a href="/logistics">Logistics</a></li>
        </ul>
      </div>
      <div className={`sidebar desktop`}>
        <div className="logo">Dashboard</div>
        <ul>
          <li><a href="/analytics">Analytics</a></li>
          <li><a href="/crm">CRM</a></li>
          <li><a href="/ecommerce">Ecommerce</a></li>
          <li><a href="/academy">Academy</a></li>
          <li><a href="/logistics">Logistics</a></li>
        </ul>
      </div>
      <div className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
