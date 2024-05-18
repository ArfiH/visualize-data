import React from 'react';

const AverageDailySales = ({ data }) => (
  <div className="average-daily-sales">
    <h3>Average Daily Sales</h3>
    <p>Total Sales This Month</p>
    <h1>$28,450</h1>
    <div className="sales-trend"> 
      {/* Insert a trend line chart here using D3.js */}
    </div>
  </div>
);

export default AverageDailySales;
