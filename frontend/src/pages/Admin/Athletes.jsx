import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Athletes = () => {
  const [athletesData, setAthletesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const athletesPerPage = 5;

  const userRole = localStorage.getItem('adminData');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole) {
      navigate('/admin/login');
      toast.info("Please login to continue.");
    }
  }, [userRole, navigate]);

  useEffect(() => {
    fetchAthletes();
  }, []); // Empty dependency array ensures this effect runs once on mount

  const fetchAthletes = () => {
    axiosInstance.get('/api/users')
      .then(response => {
        setAthletesData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching athletes:', error);
      });
  };

  const handleBlock = (id) => {
    axiosInstance.post(`/api/admin/block-user/${id}`)
      .then(response => {
        setAthletesData(prevAthletesData => {
          return prevAthletesData.map((athlete) => {
            if (id === athlete._id) {
              return { ...athlete, isBlocked: !athlete.isBlocked };
            }
            return athlete;
          });
        });
        toast.success(`Successfully ${athletesData.find(a => a._id === id).isBlocked ? 'Unblocked' : 'Blocked'} athlete.`);
      })
      .catch(err => {
        console.error("Failed to handle block:", err);
        toast.error("Failed to handle block.");
      });
  };

  const indexOfLastAthlete = currentPage * athletesPerPage;
  const indexOfFirstAthlete = indexOfLastAthlete - athletesPerPage;

  const filteredAthletes = athletesData.filter(athlete => 
    athlete.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentAthletes = filteredAthletes.slice(indexOfFirstAthlete, indexOfLastAthlete);

  const renderAthletes = () => {
    return currentAthletes.map((athlete, index) => (
      <tr key={athlete._id} className="border dark:border-redBorder bg-transparent text-textColor">
        <td className="p-3 border border-redBorder">
          <p>{indexOfFirstAthlete + index + 1}</p> {/* sl.no */}
        </td>
        <td className="p-3 border border-redBorder">
          <p>{athlete.username}</p> {/* athlete name */}
        </td>
        <td className="p-3 border border-redBorder">
          <p>{athlete.email}</p> {/* email */}
        </td>
        <td className="p-3 border border-redBorder">
          <p>{athlete.phone}</p> {/* phone */}
        </td>
        <td className="p-3 border border-redBorder text-right">
          <button
            onClick={() => handleBlock(athlete._id)}
            className={`mr-2 px-3 py-1 rounded transition-transform duration-200 hover:scale-110 ${athlete.isBlocked ? 'text-white border border-green-500 bg-green-900' : 'text-white border border-red-500 bg-red-900'}`}
          >
            {athlete.isBlocked ? 'Unblock' : 'Block'}
          </button>
        </td>
      </tr>
    ));
  };

  const totalPages = Math.ceil(filteredAthletes.length / athletesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='bg-black w-auto h-[100%]'>
      <div className="overflow-x-auto m-4 p-4 border border-redBorder bg-black text-textColor rounded-md mx-[100px] md:mx-[30px]">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search athletes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border border-redBorder rounded bg-black text-textColor pl-10"
            />
            <FaSearch className="absolute left-3 top-2.5 text-textColor" />
          </div>
        </div>
        <table className="min-w-full bg-white dark:bg-black">
          <thead>
            <tr className="border dark:border-redBorder bg-transparent text-textColor">
              <th className="p-3 border border-redBorder">sl.no</th>
              <th className="p-3 border border-redBorder">Athlete Name</th>
              <th className="p-3 border border-redBorder">Email</th>
              <th className="p-3 border border-redBorder">Phone</th>
              <th className="p-3 border border-redBorder">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentAthletes.length > 0 ? (
              renderAthletes()
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No athletes found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-semibold text-textColor border border-redBorder rounded disabled:opacity-50 dark:bg-black"
          >
            Previous
          </button>
          <span className="font-semibold text-textColor">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-semibold text-textColor border border-redBorder rounded disabled:opacity-50 dark:bg-black"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Athletes;
