import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import apiServices from "../../apiServices/apiServices"; 

const PieChartCard = () => {
  const [chartData, setChartData] = useState({ successful: 0, canceled: 0 });
  const [period, setPeriod] = useState("last30days");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchChartData(period);
  }, [period]);

  const fetchChartData = async (period) => {
    try {
      const response = await apiServices.getBookingChartData(period);
      
      const data = response.data;

      setChartData({
        successful: data.successful || 0,
        canceled: data.canceled || 0,
      });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handlePeriodChange = (selectedPeriod) => {
    setPeriod(selectedPeriod);
    setShowDropdown(false);
  };

  const getChartOptions = () => ({
    series: [chartData.successful, chartData.canceled],
    labels: ["Successful Bookings", "Canceled Bookings"],
    colors: ["#750000", "#1F1F1F"], 
    chart: {
      type: "pie",
      height: 400, 
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1000, 
      },
    },
    plotOptions: {
      pie: {
        size: "100%",
        dataLabels: {
          offset: -25,
        },
        donut: {
          size: "70%",
        },
        stroke: {
          show: true,
          width: 3, 
          colors: ["#000000"], 
        },
        expandOnClick: true, 
        hover: {
          mode: "single", 
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
        colors: ["#FFFFFF"],
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: "14px", 
        fontFamily: "Inter, sans-serif",
        background: "#000",
        color: "#fff",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: ["#FFFFFF", "#FFFFFF"], 
      },
    },
  });

  return (
    <div className="max-w-full w-full bg-black border-red-900 rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-start items-start w-full mb-5">
        <div>
        <h5 className="text-2xl text-center font-bold text-highlightTextColor m-4">
          BOOKING COMPARISON FOR -{" "}
          {period === "yesterday"
            ? "YESTERDAY"
            : period === "today"
            ? "TODAY"
            : period === "last7days"
            ? "LAST 7 DAYS"
            : period === "last30days"
            ? "LAST 30 DAYS"
            : period === "last90days"
            ? "LAST 90 DAYS"
            : period === "allTime"
            ? "All TIME"
            : "Unknown Period"}
        </h5>
            <p className="text-base font-semibold text-gray-400 mx-4"> Total Bookings : {chartData.successful+chartData.canceled}</p>
        </div>
        
      </div>
        
      <div className="w-full flex justify-center p-4">
        <div style={{ height: 400, width: 400 }}>
          {" "}
          
          <ApexCharts
            options={getChartOptions()}
            series={[chartData.successful, chartData.canceled]}
            type="pie"
            height={400} 
          />
        </div>
      </div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button"
          >
            {period === "yesterday" && "Yesterday"}
            {period === "today" && "Today"}
            {period === "last7days" && "Last 7 days"}
            {period === "last30days" && "Last 30 days"}
            {period === "last90days" && "Last 90 days"}
            {period === "allTime" && "All time"}
            <svg
              className="w-2.5 m-2.5 ms-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {showDropdown && (
            <div
              id="lastDaysdropdown"
              className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <button
                    onClick={() => handlePeriodChange("yesterday")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Yesterday
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePeriodChange("today")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Today
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePeriodChange("last7days")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Last 7 days
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePeriodChange("last30days")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Last 30 days
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePeriodChange("last90days")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Last 90 days
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePeriodChange("allTime")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    All Time
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
