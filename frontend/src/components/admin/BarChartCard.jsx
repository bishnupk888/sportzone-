import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import apiServices from '../../apiServices/apiServices'; // Adjust import based on your setup

const BarChartCard = () => {
  const [chartData, setChartData] = useState({ revenue: [] });
  const [xLabels, setXLabels] = useState([]);
  const [period, setPeriod] = useState('last30days');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchChartData(period);
  }, [period]);

  const fetchChartData = async (period) => {
    if (!period) {
      console.error('Period is not defined');
      return;
    }
    try {
      const response = await apiServices.getRevenueChartData(period);
      console.log('response in revenue chart', response);
      const data = response.data;
  
      // Process the response data
      const revenue = data.revenue || [];
      const xLabels = data.labels || [];
  
      setChartData({ revenue });
      setXLabels(xLabels);
  
      setTotalRevenue(revenue.reduce((acc, value) => acc + value, 0));
    } catch (error) {
      console.error('Error fetching revenue chart data:', error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handlePeriodChange = (selectedPeriod) => {
    setPeriod(selectedPeriod);
    setShowDropdown(false);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:bg-black p-4 md:p-6">
      <div className="flex justify-between mb-4">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            {`$${totalRevenue.toLocaleString()}`}
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Revenue generated {period}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl">
          <BarChart
            width={800} // Use full width with a max width
            height={400} // Adjust height as needed
            series={[
              { data: chartData.revenue, label: 'Revenue', id: 'revenueId', color: '#750000' } // Dark red
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]} // Ensure xAxis labels match the length of revenue data
            tooltip={{
              custom: ({ value }) => (
                <div style={{ backgroundColor: '#000', color: '#fff', padding: '5px', borderRadius: '3px' }}>
                  ${value}
                </div>
              )
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-4">
        <div className="flex justify-between items-center">
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button"
          >
            {period === 'yesterday' && 'Yesterday'}
            {period === 'today' && 'Today'}
            {period === 'last7days' && 'Last 7 days'}
            {period === 'last30days' && 'Last 30 days'}
            {period === 'last90days' && 'Last 90 days'}
            {period === 'allTime' && 'All time'}
            <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          {showDropdown && (
            <div id="lastDaysdropdown" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li><button onClick={() => handlePeriodChange('yesterday')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</button></li>
                <li><button onClick={() => handlePeriodChange('today')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</button></li>
                <li><button onClick={() => handlePeriodChange('last7days')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</button></li>
                <li><button onClick={() => handlePeriodChange('last30days')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</button></li>
                <li><button onClick={() => handlePeriodChange('last90days')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</button></li>
                <li><button onClick={() => handlePeriodChange('allTime')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All Time</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarChartCard;
