import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CustomModal from '../../components/popupComponents/imageViewerModal';
import { useNavigate } from 'react-router-dom';

const Trainers = () => {
  const [trainersData, setTrainersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const trainersPerPage = 10;

  const userRole = localStorage.getItem('adminData');

  const navigate = useNavigate();
  useEffect(() => {
    if (!userRole) {
      navigate('/admin/login');
      toast.info("Please login to continue.");
    }
  }, [userRole, navigate]);

  useEffect(() => {
    axiosInstance.get('/api/admin/trainers')
      .then(response => {
        setTrainersData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching trainers:', error);
      });
  }, []);

  const handleApprove = (id) => {
    axiosInstance.patch(`/api/admin/${id}/trainer-approval`)
      .then((response) => {
        setTrainersData(prevTrainersData => {
          return prevTrainersData.map(trainer =>
            trainer._id === id ? { ...trainer, isVerified: !trainer.isVerified } : trainer
          );
        });
        toast.success(`Trainer ${trainersData.find(trainer => trainer._id === id).isVerified ? 'Unapproved' : 'Approved'} successfully!`);
      })
      .catch((err) => {
        console.error("Failed to handle approval", err);
        toast.error(`Failed to ${trainersData.find(trainer => trainer._id === id).isVerified ? 'Approve' : 'Unapprove'} trainer ${id}`);
      });
  };

  const handleBlock = (id) => {
    axiosInstance.patch(`/api/admin/block-trainer/${id}`)
      .then(response => {
        setTrainersData(prevTrainersData => {
          return prevTrainersData.map(trainer =>
            trainer._id === id ? { ...trainer, isBlocked: !trainer.isBlocked } : trainer
          );
        });
        toast.success(`Trainer ${trainersData.find(trainer => trainer._id === id).isBlocked ? 'Unblocked' :'Blocked' } successfully!`);
      })
      .catch(err => {
        console.error("Failed to handle block:", err);
        toast.error(`Failed to ${trainersData.find(trainer => trainer._id === id).isBlocked ? 'Unblocked' :'Blocked'} trainer`);
      });
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
    console.log('Sorted data:', sorted);
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
          {trainer.certificate ? (
            <button onClick={() => openModal(trainer.certificate)} className='mr-2 px-3 py-1 rounded transition-transform duration-200 hover:scale-110 hover:border-b hover:border-redBorder hover:text-redBorder'>View Certificate</button>
          ) : (
            <span className='text-redBorder'>No certificate added</span>
          )}
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
            onClick={() => handleApprove(trainer._id)}
            className={`px-3 py-1 rounded transition-transform duration-200 hover:scale-110 ${trainer.certificate !== '' ? (trainer.isVerified ? 'text-white border border-green-500 bg-green-900' : 'text-white border border-blue-500 bg-blue-900') : 'text-white border border-yellow-500 bg-yellow-900'}`}
          >
            <span>{trainer.certificate !== '' ? (trainer.isVerified ? 'Approved' : 'Approve') : 'Pending'}</span>
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
              className="px-3 py-2 border border-redBorder rounded bg-black text-textColor pl-10"
            />
            <FaSearch className="absolute left-3 top-2.5 text-textColor" />
            <button
              onClick={handleSort}
              className="bg-black border border-redBorder text-textColor ml-2 px-4 py-2 rounded"
            >
              Sort by Name
            </button>
          </div>
        </div>
        <table className="min-w-full bg-white dark:bg-black">
          <thead>
            <tr className="border border-redBorder dark:bg-black text-textColor">
              <th className="p-3 border border-redBorder">sl.no</th>
              <th className="p-3 border border-redBorder">Trainer Name</th>
              <th className="p-3 border border-redBorder">Email</th>
              <th className="p-3 border border-redBorder">Certificate</th>
              <th className="p-3 border border-redBorder">Action</th>
              <th className="p-3 border border-redBorder">Approval</th>
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
    </div>
  );
};

export default Trainers;
