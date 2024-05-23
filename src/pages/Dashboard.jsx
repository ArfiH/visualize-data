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
        <h3>Likelihood analysis</h3>
        <LikelihoodChart />
      </div>
      
      <div className="intensity">
        <h3>Intensity analysis</h3>
        <IntensityChart />
      </div>

      <div className="topic">
        <h3>Topic wise</h3>
        <BubbleChart />
      </div>
      
      <div className="year">
        <h3>Year vs Pestle</h3>
        <YearChart />
      </div>
      
      <div className="relevance">
        <h3>Relevance analysis</h3>
        <RelevanceChart />
      </div>

      <div className="country">
        <h3>Country analysis</h3>
        <StackedBarChart />
      </div>

      
      <div className="region">
        <h3>Count of sector in every region</h3>
        <RegionChart />
      </div>
      
      {/* <div className="city">
        <h3>City wise</h3>
      </div> */}
      
    </div>
  );
};

export default Dashboard;
