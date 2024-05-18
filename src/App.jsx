import React, { useState } from 'react';
import './index.css';
import Dashboard from './pages/Dashboard';

const App = () => {
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
