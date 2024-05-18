import React from 'react';

const AnalyticsCard = ({ data }) => (
  <div className="analytics-card">
    <h3>Website Analytics</h3>
    <p>Total 28.5% Conversion Rate</p>
    <div className="analytics-stats">
      <div>1.5k Sessions</div>
      <div>3.1k Page Views</div>
      <div>1.2k Leads</div>
      <div>12% Conversions</div>
    </div>
  </div>
);

export default AnalyticsCard;
