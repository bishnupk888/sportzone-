import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const WebsiteTrafficWidget = () => {
  const getChartOptions = () => ({
    series: [52.8, 47.2],
    colors: ["#1C1C1C", "#2D2D2D"],
    chart: {
      height: 420,
      width: "100%",
      type: "pie",
    },
    stroke: {
      width: 2,
      colors: ["#7F1D1D"], // Tailwind's red-900 color
    },
    plotOptions: {
      pie: {
        size: "100%",
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels: ["Trainers", "Users"],
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
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        background: '#000',
        color: '#fff',
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
  });

  useEffect(() => {
    const chart = new ApexCharts(document.getElementById("pie-chart"), getChartOptions());
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="max-w-full w-full bg-black  border-red-900 rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-center items-start w-full mb-5">
        <h5 className="text-xl text-center font-bold  text-white">
          Trainer vs User Ratio
        </h5>
      </div>
      <div id="pie-chart"></div>
    </div>
  );
};

export default WebsiteTrafficWidget;
