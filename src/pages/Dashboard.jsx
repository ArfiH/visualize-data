import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="analytics-card">
        <h3>Website Analytics</h3>
        <p>Total 28.5% Conversion Rate</p>
        <div className="analytics-stats">
          <div>
            <h4>268</h4>
            <p>Direct</p>
          </div>
          <div>
            <h4>890</h4>
            <p>Organic</p>
          </div>
          <div>
            <h4>622</h4>
            <p>Referral</p>
          </div>
          <div>
            <h4>1.2k</h4>
            <p>Campaign</p>
          </div>
        </div>
      </div>
      <div className="average-daily-sales">
        <h3>Average Daily Sales</h3>
        <h1>$28,450</h1>
      </div>
      <div className="sales-overview">
        <h3>Sales Overview</h3>
        {/* Add your sales overview chart here */}
      </div>
      <div className="earning-reports">
        <h3>Earning Reports</h3>
        <h1>$468</h1>
        <div className="earning-stats">
          <div>
            <h4>$545.69</h4>
            <p>Earnings</p>
          </div>
          <div>
            <h4>$256.34</h4>
            <p>Profit</p>
          </div>
          <div>
            <h4>$74.19</h4>
            <p>Expense</p>
          </div>
        </div>
      </div>
      <div className="support-tracker">
        <h3>Support Tracker</h3>
        <h1>164</h1>
        <div className="tracker-stats">
          <div>
            <h4>142</h4>
            <p>New Tickets</p>
          </div>
          <div>
            <h4>28</h4>
            <p>Open Tickets</p>
          </div>
        </div>
        <div className="completed-task">
          <h3>85%</h3>
          <p>Completed Task</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
