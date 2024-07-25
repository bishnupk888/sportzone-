import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { setBlockedStatus } from '../../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import UserDetails from '../../components/admin/UserDetails';
import apiServices from '../../apiServices/apiServices';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const Athletes = () => {
  const [athletesData, setAthletesData] = useState([]);
  const [athleteData, setAthleteData] = useState(null);
  const [viewUserDetails, setViewUserDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const athletesPerPage = 10;


  const isBlocked = useSelector((state) => state.user.isBlocked);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 

  useEffect(() => {
    fetchAthletes();
  }, []); 

  const fetchAthletes = () => {
    apiServices.getAllUsers()
      .then(response => {
        setAthletesData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching athletes:', error); 
      });
  };

  const handleBlock = (id) => {
    apiServices.ManageBlockUser(id)
      .then(response => {
        setAthletesData(prevAthletesData => {
          return prevAthletesData.map((athlete) => {
            if (id === athlete._id) {
              dispatch(setBlockedStatus(!isBlocked));
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
          <p>{indexOfFirstAthlete + index + 1}</p> 
        </td>
        <td className="p-3 border border-redBorder">
          <p>{athlete.username}</p> 
        </td>
        <td className="p-3 border border-redBorder">
          <p>{athlete.email}</p>
        </td>
        <td className="p-3 border border-redBorder text-right">
          <button
            onClick={() => handleBlock(athlete._id)}
            className={`mr-2 px-3 py-1 rounded transition-transform duration-200 hover:scale-110 ${athlete.isBlocked ? 'text-white border border-green-500 bg-green-900' : 'text-white border border-red-500 bg-red-900'}`}
          >
            {athlete.isBlocked ? 'Unblock' : 'Block'}
          </button>
        </td>
        <td className="p-3 border border-redBorder text-right">
          <button
            onClick={() => handleViewDetails(athlete)}
            className={`mr-2 px-3 py-1 rounded transition-transform duration-200 hover:scale-110 text-white border border-green-500 bg-green-900 `}
          >
            Details
          </button>
        </td>
      </tr>
    ));
  };

  const totalPages = Math.ceil(filteredAthletes.length / athletesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSort = () => {
    const sorted = [...athletesData].sort((a, b) => {
        return a.username.localeCompare(b.username);
    });
    setAthletesData(sorted);
  };

  const handleViewDetails = (athlete) => {
    setAthleteData(athlete);
    setViewUserDetails(true);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["SL No", "Athlete Name", "Email", "Status"];
    const tableRows = [];

    filteredAthletes.forEach((athlete, index) => {
      tableRows.push([
        indexOfFirstAthlete + index + 1,
        athlete.username,
        athlete.email,
        athlete.isBlocked ? 'Blocked' : 'Active'
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 10,
    });
    doc.save('athletes.pdf');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredAthletes.map((athlete, index) => ({
        "SL No": indexOfFirstAthlete + index + 1,
        "Athlete Name": athlete.username,
        "Email": athlete.email,
        "Status": athlete.isBlocked ? 'Blocked' : 'Active',
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Athletes');
    XLSX.writeFile(wb, 'athletes.xlsx');
  };

  return (
    <div className='bg-black w-auto h-[100%]'>
      <div className="overflow-x-auto m-4 p-4 border border-redBorder bg-black text-textColor rounded-md mx-[100px] md:mx-[30px]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className='text-2xl font-bold pl-10'>ATHLETES</h1>
          </div>
          <div className="relative">
            <input 
              type="search" 
              placeholder="Search athletes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border border-redBorder rounded bg-black text-textColor pl-10 hover:scale-95"
            />
            <FaSearch className="absolute left-3 top-2.5 text-textColor " />
            <button
              onClick={handleSort}
              className="bg-black border border-redBorder text-textColor ml-2 px-4 py-2 rounded hover:scale-95"
            >
              Sort by Name
            </button>
            <button
              onClick={exportToPDF}
              className="bg-green-800 border border-green-900 text-white ml-2 px-4 py-2 rounded hover:scale-95"
            >
              Export to PDF
            </button>
            <button
              onClick={exportToExcel}
              className="bg-blue-800 border border-blue-900 text-white ml-2 px-4 py-2 rounded hover:scale-95"
            >
              Export to Excel
            </button>
          </div>
        </div>
        <table className="min-w-full bg-white dark:bg-black">
          <thead>
            <tr className="border dark:border-redBorder bg-transparent text-textColor">
              <th className="p-3 border border-redBorder">sl.no</th>
              <th className="p-3 border border-redBorder">Athlete Name</th>
              <th className="p-3 border border-redBorder">Email</th>
              <th className="p-3 border border-redBorder">Options</th>
              <th className="p-3 border border-redBorder">More</th>
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
      {viewUserDetails && <UserDetails user={athleteData} setViewUserDetails={setViewUserDetails} />}
    </div>
  );
};

export default Athletes;

