import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="sidebar">
    <div className="logo">Dashboard</div>
    <ul className='sidebar__links'>
      <li><Link to="/analytics">Analytics</Link></li>
      <li><Link to="/crm">CRM</Link></li>
      <li><Link to="/ecommerce">Ecommerce</Link></li>
      <li><Link to="/academy">Academy</Link></li>
      <li><Link to="/logistics">Logistics</Link></li>
    </ul>
  </aside>
);

export default Sidebar;
