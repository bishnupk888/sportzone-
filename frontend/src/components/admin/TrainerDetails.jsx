import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ConfirmationModal from '../popupComponents/ConfirmationModal';
import CustomModal from '../popupComponents/imageViewerModal';

const TrainerDetails = ({ trainer, setViewTrainerDetails, approveTrainer, rejectTrainer }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState('');

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmReject = () => {
    rejectTrainer(trainer._id, rejectReason);
    setModalOpen(false);
  };

  const openCertificateModal = (url) => {
    setCertificateUrl(url);
    setIsCertificateModalOpen(true);
  };

  const closeCertificateModal = () => {
    setCertificateUrl('');
    setIsCertificateModalOpen(false);
  };

  if (!trainer) {
    return <div>No trainer details found</div>;
  }

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative bg-black border border-gray-200 rounded-lg shadow-md p-10 text-white w-full max-w-3xl">
        <button onClick={() => setViewTrainerDetails(false)} className="absolute top-4 left-4 bg-black border border-red-600 text-white px-4 py-2 rounded hover:scale-105 flex items-center">
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        <h1 className="text-white lg:text-4xl md:text-3xl text-3xl py-4 font-bold text-center">TRAINER DETAILS</h1>

        <div className="flex items-center mb-6">
          <div className="relative h-20 w-20 border border-redBorder rounded-full">
            <img
              className="h-full w-full rounded-full object-cover object-center"
              src={trainer?.profileImage}
              alt=""
            />
          </div>
          <div className="ml-4 text-textColor">
            <h2 className="text-2xl font-bold text-highlightTextColor">{trainer?.username}</h2>
            <p className="text-gray-400">{trainer?.email}</p>
          </div>
          
          
        </div>
        <div className='text-lg text-textColor'>
            <p>About : <span>{trainer?.about}</span></p>
            <p>Department : <span>{trainer?.department}</span></p>
            <p>Fee : <span>{trainer?.fee }</span> / Hour </p>
            <p>Gender : <span>{trainer?.gender}</span></p>
            <p> Verification Status : <span className={`${trainer?.isVerified ? 'text-green-500' : 'text-red-500'}`}>{trainer.isVerified ? 'Verified' : 'Unverified'}</span> </p>
            <p>Phone : <span>{trainer?.phone}</span></p>
        </div>

        <div className="mb-6">
          {trainer.certificate ? (
            <>
            <span>Certificate :</span>
            <span className={`${trainer.certificate !== '' ?'text-green-500': 'text-red-600'}`}> {trainer.certificate?' Added ':' Not Added '}</span>
            {trainer.certificate && <button
              onClick={() => openCertificateModal(trainer.certificate)}
              className=" px-4  border border-green-700 bg-green-700 text-white rounded-md hover:scale-105 hover:bg-green-500" 
            >
              View 
            </button>}
            </>
          ) : (
            <span className="text-redBorder">No certificate added</span>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => approveTrainer(trainer?._id)}
            className="bg-green-700 font-semibold border border-green-600 text-white hover:bg-green-500 hover:scale-105 px-4 py-2 rounded-md"
          >
            Approve Trainer
          </button>
          <button
            onClick={handleOpenModal}
            className="bg-red-700 font-semibold border border-red-600 text-white hover:bg-red-500 hover:scale-105 px-4 py-2 rounded-md"
          >
            Reject Trainer
          </button>
        </div>
      </div>

      {modalOpen && (
        <ConfirmationModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmReject}
          question={"Need To Reject This Trainer?"}
          message={
            <div>
              <p className="mb-2">Please provide a reason for rejection:</p>
              <textarea
                className="w-full p-2 border rounded"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
          }
        />
      )}
      <CustomModal
        isOpen={isCertificateModalOpen}
        onClose={closeCertificateModal}
        imageUrl={certificateUrl}
      />
    </div>
  );
};

export default TrainerDetails;
