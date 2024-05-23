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
      <header className='heading'>
        <svg width="64px" height="64px" viewBox="0 0 64.00 64.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M55.64 22.751H35.09C34.5596 22.751 34.0509 22.9617 33.6758 23.3368C33.3007 23.7118 33.09 24.2205 33.09 24.751V55.571C33.0916 56.1009 33.3028 56.6087 33.6775 56.9834C34.0523 57.3582 34.5601 57.5694 35.09 57.571H55.64C56.1699 57.5694 56.6777 57.3582 57.0525 56.9834C57.4272 56.6087 57.6384 56.1009 57.64 55.571V24.751C57.64 24.2205 57.4293 23.7118 57.0542 23.3368C56.6791 22.9617 56.1704 22.751 55.64 22.751Z" fill="#999999"></path> <path d="M55.64 5.62695H35.09C34.5596 5.62695 34.0509 5.83767 33.6758 6.21274C33.3007 6.58781 33.09 7.09652 33.09 7.62695V17.8969C33.0916 18.4269 33.3028 18.9347 33.6775 19.3094C34.0523 19.6841 34.5601 19.8954 35.09 19.8969H55.64C56.1699 19.8954 56.6777 19.6841 57.0525 19.3094C57.4272 18.9347 57.6384 18.4269 57.64 17.8969V7.62695C57.64 7.09652 57.4293 6.58781 57.0542 6.21274C56.6791 5.83767 56.1704 5.62695 55.64 5.62695Z" fill="#000000"></path> <path d="M28.24 36.451H7.7C6.59543 36.451 5.7 37.3465 5.7 38.451V55.5711C5.7 56.6756 6.59543 57.5711 7.7 57.5711H28.24C29.3446 57.5711 30.24 56.6756 30.24 55.5711V38.451C30.24 37.3465 29.3446 36.451 28.24 36.451Z" fill="#000000"></path> <path d="M28.24 5.62697H7.70002C7.43712 5.62604 7.17661 5.67714 6.93355 5.77733C6.69048 5.87751 6.46964 6.02477 6.28373 6.21068C6.09783 6.39658 5.95054 6.61742 5.85035 6.86049C5.75017 7.10355 5.6991 7.36406 5.70002 7.62697V31.557C5.70002 32.0874 5.91074 32.5961 6.28581 32.9712C6.66088 33.3462 7.16959 33.557 7.70002 33.557H28.24C28.7704 33.557 29.2791 33.3462 29.6542 32.9712C30.0293 32.5961 30.24 32.0874 30.24 31.557V7.62697C30.2409 7.36406 30.1898 7.10355 30.0896 6.86049C29.9895 6.61742 29.8422 6.39658 29.6563 6.21068C29.4704 6.02477 29.2495 5.87751 29.0065 5.77733C28.7634 5.67714 28.5029 5.62604 28.24 5.62697Z" fill="#999999"></path> </g></svg>
        <h2>Dashboard</h2>  
      </header>    
     
      <main className='main'>
        <div className="flex-container">
          <div className="intensity card">
            <h3>Intensity analysis</h3>
            <IntensityChart />
          </div>
          <div className="year card">
            <h3>Year vs Pestle</h3>
            <YearChart />
          </div>
        </div>
        <div className="likelihood card">
          <h3>Likelihood analysis</h3>
          <LikelihoodChart />
        </div>
        <div className="topic card">
          <h3>Topic wise</h3>
          <BubbleChart />
        </div>
        
        <div className="relevance card">
          <h3>Relevance analysis</h3>
          <RelevanceChart />
        </div>
        <div className="country card">
          <h3>Country analysis</h3>
          <StackedBarChart />
        </div>
        <div className="region card">
          <h3>Count of sector in every region</h3>
          <RegionChart />
        </div>
      </main>
      
    </div>
  );
};

export default Dashboard;
