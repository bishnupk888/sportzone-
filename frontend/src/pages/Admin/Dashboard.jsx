import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import AreaChartCard from "../../components/admin/AreaChartCard";
import PieChart from "../../components/admin/PieChart";
import ComparisonChart from "../../components/admin/CompariosonChart";

const Dashboard = () => {
  const userRole = localStorage.getItem("adminData");
  console.log("userRole of admin:", userRole);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole) {
      navigate("/admin/login");
      toast.info("Please login for more.");
    }
  }, [userRole, navigate]);

  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div className="bg-black text-white">
      <h1 className="text-4xl font-bold m-10">DASHBOARD</h1>

      <section
        ref={ref}
        className="p-6 pb-10 dark:bg-transparent dark:text-gray-300 mx-10 m-b-10  rounded-2xl "
      >
        <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3 ">
          <div className="flex flex-col justify-start m-2 lg:m-12 border-b-2 rounded-xl  border-redBorder p-4 ">
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              {inView && <CountUp end={500} duration={2.5} />}
            </p>
            <p className="text-lg">ATHLETES REGISTERED</p>
          </div>
          <div className="flex flex-col justify-start m-4 lg:m-12 border-b-2 rounded-xl  border-redBorder p-4  ">
            <p className="text-4xl font-bold leading-none lg:text-6xl ">
              {inView && <CountUp end={100} duration={2.5} />}
            </p>
            <p className="text-lg">VERIFIED TRAINERS</p>
          </div>
          <div className="flex flex-col justify-start m-4 lg:m-12 border-b-2 rounded-xl  border-redBorder p-4">
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              {inView && <CountUp end={300} duration={2.5} />}
            </p>
            <p className="text-lg">SUCCESSFUL BOOKINGS</p>
          </div>
          <div className="flex flex-col justify-start m-4 lg:m-12 border-b-2 rounded-xl  border-redBorder p-4">
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              {inView && <CountUp end={800000} duration={2.5} separator="," />}
            </p>
            <p className="text-lg">REVENUE GENERATED</p>
          </div>
          <div className="flex flex-col justify-start m-4 lg:m-12 border-b-2 rounded-xl  border-redBorder p-4">
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              {inView && <CountUp end={22} duration={2.5} />}
            </p>
            <p className="text-lg">Years of experience</p>
          </div>
          <div className="flex flex-col justify-start m-4 lg:m-12 border-b-2 rounded-xl  border-redBorder p-4">
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              {inView && <CountUp end={10} duration={2.5} />}
            </p>
            <p className="text-sm">Workshops</p>
          </div>
        </div>
      </section>
      {/* <div className="m-10 ">
        <PieChart />
      </div> */}
      <div className="flex justify-center">
        <div className="m-10">
          <AreaChartCard />
        </div>
        <div className="m-10">
          <ComparisonChart />
        </div>
        <div className="m-10">
          <AreaChartCard />
        </div>
        
      </div>
      
    </div>
  );
};

export default Dashboard;
