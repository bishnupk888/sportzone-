import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { PieChart } from "@mui/x-charts/PieChart";
import AreaChartCard from "../../components/admin/AreaChartCard";
import ComparisonChart from "../../components/admin/CompariosonChart";
import axiosInstance from "../../axiosInstance/axiosInstance"; // Assuming you have axiosInstance configured
import BarChartCard from "../../components/admin/BarChartCard";
import apiServices from "../../apiServices/apiServices";
import PieChartCard from "../../components/admin/PieChartCard";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    athletesRegistered: 0,
    trainersRegistered: 0,
    successfulBookings: 0,
    revenueGenerated: 0,
    slotsBooked: 0,
    slotsCount: 0,
    cancelledBookingsCount: 0,
    totalBookings: 0,
  });

  const [pieData, setPieData] = useState([
    { name: "Athletes", value: 0 },
    { name: "Trainers", value: 0 },
  ]);

  useEffect(() => {
    console.log(pieData); // Check data structure
  }, [pieData]);

  const userRole = localStorage.getItem("adminData");
  const navigate = useNavigate();
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userRole) {
      navigate("/admin/login");
      toast.info("Please login for more.");
    } else {
      fetchData();
    }
  }, [userRole]);

  const fetchData = async () => {
    try {
      const response = await apiServices.getDashBoardData();
      console.log(response.data.dashBoardData);
      const {
        totalUsersCount,
        totalTrainersCount,
        totalRevenueGenerated,
        successfulBookingsCount,
        bookedSlotsCount,
        slotsCount,
        cancelledBookingsCount,
        totalBookings,
      } = response.data.dashBoardData;
      setDashboardData({
        athletesRegistered: totalUsersCount,
        trainersRegistered: totalTrainersCount,
        successfulBookings: successfulBookingsCount,
        revenueGenerated: totalRevenueGenerated,
        slotsBooked: bookedSlotsCount,
        slotsCount,
        cancelledBookingsCount,
        totalBookings,
      });

      setPieData([
        { name: "Athletes", value: totalUsersCount },
        { name: "Trainers", value: totalTrainersCount },
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="bg-black text-white">
      <h1 className="text-4xl font-bold m-10">DASHBOARD</h1>

      <section
        ref={ref}
        className="p-6 pb-10 dark:bg-transparent dark:text-gray-300 mx-10 mb-10 rounded-2xl"
      >
        <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3 gap-4">
          <div className="flex flex-col justify-start m-2 lg:m-12 border-b-2 rounded-xl border-redBorder p-4">
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              {inView && (
                <CountUp
                  end={dashboardData.athletesRegistered}
                  duration={2.5}
                />
              )}
            </p>
            <p className="text-lg">ATHLETES REGISTERED</p>
          </div>
          <div className="flex flex-col justify-start m-4 lg:m-12 border-b-2 rounded-xl border-redBorder p-4">
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              {inView && (
                <CountUp
                  end={dashboardData.trainersRegistered}
                  duration={2.5}
                />
              )}
            </p>
            <p className="text-lg">TRAINERS REGISTERED</p>
          </div>
          <div className="flex flex-col justify-start m-4 lg:m-12 border-b-2 rounded-xl border-redBorder p-4">
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              {inView && (
                <CountUp
                  end={dashboardData.successfulBookings}
                  duration={2.5}
                />
              )}
            </p>
            <p className="text-lg">SUCCESSFUL BOOKINGS</p>
          </div>
          <div className="flex flex-col justify-start m-4 lg:m-12 border-b-2 rounded-xl border-redBorder p-4">
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              {inView && (
                <CountUp
                  end={dashboardData.revenueGenerated}
                  duration={2.5}
                  separator=","
                />
              )}
            </p>
            <p className="text-lg">REVENUE GENERATED</p>
          </div>
          <div className="flex flex-col justify-start m-4 lg:m-12 border-b-2 rounded-xl border-redBorder p-4">
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              {inView && (
                <CountUp end={dashboardData.slotsCount} duration={2.5} />
              )}
            </p>
            <p className="text-lg">SLOTS CREATED</p>
          </div>
          <div className="flex flex-col justify-start m-4 lg:m-12 border-b-2 rounded-xl border-redBorder p-4">
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              {inView && (
                <CountUp end={dashboardData.totalBookings} duration={2.5} />
              )}
            </p>
            <p className="text-lg">TOTAL BOOKINGS</p>
          </div>
        </div>
      </section>
      <hr className="m-20  border-textColor"/>
      <div className="flex flex-col lg:flex-row items-center justify-center m-10">
        <div className="w-full lg:w-1/2 p-4 flex justify-center">
          <AreaChartCard role={"user"} />
        </div>

        <div className="w-full lg:w-1/2 p-4 flex justify-center">
          <AreaChartCard role={"trainer"} />
        </div>
      </div>
      <div className="border border-redBorder m-20">
      <PieChartCard/>
      </div>

      {/* <ComparisonChart role={'trainer'}/>
      <BarChartCard /> */}

      {/* <div className="w-full flex justify-center p-4" style={{ height: 300, width: 300 }}>
        <PieChart
          series={[
            {
              data: pieData,
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 180,
              cx: 150,
              cy: 150,
            }
          ]}
          colors={['darkgray', 'darkred']} // Set colors here
        />
      </div> */}
    </div>
  );
};

export default Dashboard;
