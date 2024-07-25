import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CustomModal from '../../components/popupComponents/imageViewerModal';
import TrainerDetails from '../../components/admin/TrainerDetails';
import apiServices from '../../apiServices/apiServices';
import socket from '../../utils/socket';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

const Trainers = () => {
  const [trainersData, setTrainersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const [trainerData, setTrainerData] = useState(null);
  const trainersPerPage = 10;

  const userRole = localStorage.getItem('adminData');
  const navigate = useNavigate();

 

  useEffect(() => {
    apiServices.getAllTrainers()
      .then(response => {
        setTrainersData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching trainers:', error);
      });
  }, []);

  const handleApprove = (id) => {
    apiServices.trainerAproval(id)
      .then((response) => {
        const content = `your verification Approved`;
        socket.emit("notification", { content, receiverId: id, sender: 'Admin' });
        setTrainersData(prevTrainersData => prevTrainersData.map(trainer =>
          trainer._id === id ? { ...trainer, isVerified: true } : trainer
        ));
        toast.success(`Trainer approved successfully!`);
        setViewDetails(false);
      })
      .catch((err) => {
        console.error("Failed to approve trainer", err);
        toast.error(`Failed to approve trainer ${id}`);
      });
  };

  const handleRejectTrainer = (id, reason) => {
    apiServices.trainerRejection(id, reason)
      .then((response) => {
        const content = `your verification rejected due to ${reason}`;
        socket.emit("notification", { content, receiverId: id, sender: 'Admin' });
        setTrainersData(prevTrainersData => prevTrainersData.map(trainer =>
          trainer._id === id ? { ...trainer, isVerified: false } : trainer
        ));
        toast.success(`Trainer rejected successfully!`);
        setViewDetails(false);
      })
      .catch((err) => {
        console.error("Failed to reject trainer", err);
        toast.error(`Failed to reject trainer ${id}`);
      });
  };

  const handleBlock = (id) => {
    apiServices.manageBlockTrainer(id)
      .then(response => {
        setTrainersData(prevTrainersData => prevTrainersData.map(trainer =>
          trainer._id === id ? { ...trainer, isBlocked: !trainer.isBlocked } : trainer
        ));
        toast.success(`Trainer ${trainersData.find(trainer => trainer._id === id).isBlocked ? 'Unblocked' : 'Blocked'} successfully!`);
      })
      .catch(err => {
        console.error("Failed to handle block:", err);
        toast.error(`Failed to ${trainersData.find(trainer => trainer._id === id).isBlocked ? 'Unblock' : 'Block'} trainer`);
      });
  };

  const handleViewTrainerDetails = (trainer) => {
    setTrainerData(trainer);
    setViewDetails(true);
  };

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalImageUrl('');
    setIsOpen(false);
  };

  const indexOfLastTrainer = currentPage * trainersPerPage;
  const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;

  const filteredTrainers = trainersData.filter(trainer =>
    trainer.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentTrainers = filteredTrainers.slice(indexOfFirstTrainer, indexOfLastTrainer);

  const handleSort = () => {
    const sorted = [...trainersData].sort((a, b) => {
      return a.username.localeCompare(b.username);
    });
    setTrainersData(sorted);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["SL No", "Trainer Name", "Email", "Status"];
    const tableRows = [];

    filteredTrainers.forEach((trainer, index) => {
      tableRows.push([
        indexOfFirstTrainer + index + 1,
        trainer.username,
        trainer.email,
        trainer.isVerified ? 'Verified' : 'Not Verified'
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 10,
    });
    doc.save('trainers.pdf');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredTrainers.map((trainer, index) => ({
        "SL No": indexOfFirstTrainer + index + 1,
        "Trainer Name": trainer.username,
        "Email": trainer.email,
        "Status": trainer.isVerified ? 'Verified' : 'Not Verified',
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Trainers');
    XLSX.writeFile(wb, 'trainers.xlsx');
  };

  const renderTrainers = () => {
    return currentTrainers.map((trainer, index) => (
      <tr key={trainer._id} className="border border-redBorder dark:bg-black text-textColor">
        <td className="p-3 border border-redBorder">
          <p>{indexOfFirstTrainer + index + 1}</p>
        </td>
        <td className="p-3 border border-redBorder">
          <p>{trainer.username}</p>
        </td>
        <td className="p-3 border border-redBorder">
          <p>{trainer.email}</p>
        </td>
        <td className="p-3 border border-redBorder text-center">
          <button
            onClick={() => handleBlock(trainer._id)}
            className={`mr-2 px-3 py-1 rounded transition-transform duration-200 hover:scale-110 ${trainer.isBlocked ? 'text-white border border-green-500 bg-green-900' : 'text-white border border-red-500 bg-red-900'}`}
          >
            <span>{trainer.isBlocked ? 'Unblock' : 'Block'}</span>
          </button>
        </td>
        <td className="p-3 border border-redBorder text-center">
          <button
            onClick={() => handleViewTrainerDetails(trainer)}
            className="mr-2 px-3 py-1 rounded transition-transform duration-200 hover:scale-110 text-white border border-green-500 bg-green-900"
          >
            Details
          </button>
        </td>
      </tr>
    ));
  };

  const totalPages = Math.ceil(filteredTrainers.length / trainersPerPage);

  return (
    <div className='bg-black w-auto h-[100%]'>
      <div className="overflow-x-auto m-4 p-4 border border-redBorder bg-black text-textColor rounded-md mx-[30px]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className='text-2xl font-bold pl-10'>TRAINERS</h1>
          </div>
          <div className="relative">
            <input
              type="search"
              placeholder="Search trainers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border border-redBorder rounded bg-black text-textColor pl-10 hover:scale-95"
            />
            <FaSearch className="absolute left-3 top-2.5 text-textColor" />
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
            <tr className="border border-redBorder dark:bg-black text-textColor">
              <th className="p-3 border border-redBorder">sl.no</th>
              <th className="p-3 border border-redBorder">Trainer Name</th>
              <th className="p-3 border border-redBorder">Email</th>
              <th className="p-3 border border-redBorder">Action</th>
              <th className="p-3 border border-redBorder">More</th>
            </tr>
          </thead>
          <tbody>
            {currentTrainers.length > 0 ? (
              renderTrainers()
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No trainers found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-semibold text-textColor border border-redBorder rounded disabled:opacity-50 dark:bg-black"
          >
            Previous
          </button>
          <span className="font-semibold text-textColor">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-semibold text-textColor border border-redBorder rounded disabled:opacity-50 dark:bg-black"
          >
            Next
          </button>
        </div>
      </div>

      <CustomModal isOpen={isOpen} onClose={closeModal} imageUrl={modalImageUrl} />
      {viewDetails && <TrainerDetails trainer={trainerData} approveTrainer={handleApprove} setViewTrainerDetails={setViewDetails} rejectTrainer={handleRejectTrainer} />}
    </div>
  );
};

export default Trainers;
