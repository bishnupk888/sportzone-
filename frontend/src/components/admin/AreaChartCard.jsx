import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axiosInstance from '../../axiosInstance/axiosInstance';
import apiServices from '../../apiServices/apiServices';
import { useNavigate } from 'react-router-dom';

const AreaChartCard = ({ role }) => {
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [period, setPeriod] = useState('last30days')
  const [usersCount, setUsersCount] = useState(0)

  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const navigate = useNavigate()
  useEffect(() => {
    fetchChartData(period);

  }, [period]);

  const fetchChartData = async (period) => {
    try {
      apiServices.getChartData(role,period)
      .then((response)=>{
      const data = response.data;
      setChartData(data.map(item => item.count));
      setCategories(data.map(item => item._id));
      if (data.length > 0) {
        const totalUsersCount = data.reduce((acc, item) => acc + item.count, 0);
        setUsersCount(totalUsersCount);
      } else {
        setUsersCount(0);
      }
      })
      .catch((err)=>{
        console.error(err)
      })
      
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  const handlePeriodChange = (selectedPeriod) => {
    setPeriod(selectedPeriod); // Update period state based on selected option
    setShowDropdown(false); // Hide dropdown after selection
  };

  const options = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
      },
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#750000",
        gradientToColors: ["#750000"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
      colors: ["#750000"],
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: `new ${role}s`,
        data: chartData,
        color: "#750000",
      },
    ],
    xaxis: {
      categories: categories,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow dark:bg-black border border-redBorder p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-highlightTextColor pb-2">{`${usersCount} ${role}s`}</h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">{`  joined ${period}`}</p>
        </div>
        {/* <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-700  text-center">
          12%
          <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
          </svg>
        </div> */}
      </div>
      <div id="area-chart">
        <Chart options={options} series={options.series} type="area" height="150" />
      </div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown} // Toggle dropdown visibility on button click
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
          {showDropdown && ( // Render dropdown list only when showDropdown is true
            <div id="lastDaysdropdown" className=" absolute  z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li><button onClick={() => handlePeriodChange('yesterday')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</button></li>
                <li><button onClick={() => handlePeriodChange('today')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</button></li>
                <li><button onClick={() => handlePeriodChange('last7days')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</button></li>
                <li><button onClick={() => handlePeriodChange('last30days')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</button></li>
                <li><button onClick={() => handlePeriodChange('last90days')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</button></li>
                <li><button onClick={() => handlePeriodChange('allTime')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All Time </button></li>


              </ul>
            </div>
          )}
          <p
            onClick={()=>navigate(`/admin/${role}s`)}
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-red-600 hover:text-red-700 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
          >
            {role}s details
            <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AreaChartCard;

