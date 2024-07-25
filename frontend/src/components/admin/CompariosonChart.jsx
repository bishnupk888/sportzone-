import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const ComparisonChart = () => {
  useEffect(() => {
    const options = {
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "line",
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
        theme: 'dark', 
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          background: '#000', 
          color: '#fff', 
        },
        x: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
        curve: 'smooth',
      },
      series: [
        {
          name: "Trainers",
          data: [6500, 6418, 6456, 6526, 6356, 6456],
          color: "#ABABAB",
        },
        {
          name: "Users",
          data: [6456, 6356, 6526, 6332, 6418, 6500],
          color: "#750000",
        },
      ],
      legend: {
        show: false,
      },
      xaxis: {
        categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-red-800',
          },
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

    if (document.getElementById("line-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("line-chart"), options);
      chart.render();

      return () => {
        chart.destroy(); 
      };
    }
  }, []);

  return (
    <div className="max-w-sm w-full bg-neutral-950 rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between mb-5">
        <div className="grid gap-4 grid-cols-2">
          <div>
            <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">
              Trainers
            </h5>
            <p className="text-gray-900 dark:text-white text-2xl leading-none font-bold">42.3k</p>
          </div>
          <div>
            <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">
              Users
            </h5>
            <p className="text-gray-900 dark:text-white text-2xl leading-none font-bold">$5.40</p>
          </div>
        </div>
      </div>
      <div id="line-chart"></div>
    </div>
  );
};

export default ComparisonChart;
