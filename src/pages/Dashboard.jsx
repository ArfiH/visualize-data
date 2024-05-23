import React from 'react';
import './Dashboard.css';
import IntensityChart from '../components/IntensityChart';
import LikelihoodChart from '../components/LikelihoodChart';
import RelevanceChart from '../components/RelevanceChart';
import YearChart from '../components/YearChart';
import StackedBarChart from '../components/StackedBarChart';
import BubbleChart from '../components/BubbleChart';
import RegionChart from '../components/RegionChart';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="likelihood">
        <h3>Likelihood</h3>
        <LikelihoodChart />
      </div>
      
      <div className="intensity">
        <h3>Intensity</h3>
        <IntensityChart />
      </div>

      <div className="topic">
        <h3>Topic wise</h3>
        <BubbleChart />
      </div>
      
      <div className="year">
        <h3>Year wise</h3>
        <YearChart />
      </div>
      
      <div className="relevance">
        <h3>Relevance</h3>
        <RelevanceChart />
      </div>

      <div className="country">
        <h3>Country wise</h3>
        <StackedBarChart />
      </div>

      
      <div className="region">
        <h3>Region wise</h3>
        <RegionChart />
      </div>
      
      {/* <div className="city">
        <h3>City wise</h3>
      </div> */}
      
    </div>
  );
};

export default Dashboard;
