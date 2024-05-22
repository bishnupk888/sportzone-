import React, { useState } from 'react';

const Trainers = () => {
  // Dummy data
  const trainers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      certificate: 'Certified Trainer',
      approved: true
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      certificate: 'Advanced Trainer',
      approved: false
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      certificate: 'Master Trainer',
      approved: true
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      certificate: 'Beginner Trainer',
      approved: false
    },
    {
      id: 5,
      name: 'Chris Lee',
      email: 'chris.lee@example.com',
      certificate: 'Expert Trainer',
      approved: true
    },
    // Add more trainers as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const trainersPerPage = 2;

  // Calculate pagination
  const indexOfLastTrainer = currentPage * trainersPerPage;
  const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
  const currentTrainers = trainers.slice(indexOfFirstTrainer, indexOfLastTrainer);

  const renderTrainers = () => {
    return currentTrainers.map((trainer, index) => (
      <tr key={trainer.id} className="border-2 dark:border-redBorder dark:bg-black text-textColor">
        <td className="p-3 border-2 border-redBorder">
          <p>{indexOfFirstTrainer + index + 1}</p> {/* sl.no */}
        </td>
        <td className="p-3 border-2 border-redBorder">
          <p>{trainer.name}</p> {/* trainer name */}
        </td>
        <td className="p-3 border-2 border-redBorder">
          <p>{trainer.email}</p> {/* email */}
        </td>
        <td className="p-3 border-2 border-redBorder">
          <p>{trainer.certificate}</p> {/* certificate */}
        </td>
        <td className="p-3 border-2 border-redBorder text-right">
          <button className="mr-2 px-3 py-1 border-2 border-redBorder rounded">Block</button>
          
        </td>
        <td className="p-3 border-2 border-redBorder text-right">
          <span className="px-3 py-1 font-semibold rounded-md dark:bg-transparent dark:text-textColor border border-redBorder">
            <span>{trainer.approved ? 'Approved' : 'Pending'}</span>
          </span>
        </td>
      </tr>
    ));
  };

  const totalPages = Math.ceil(trainers.length / trainersPerPage);

  return (
    <div className="overflow-x-auto m-4 p-4 border-2 border-redBorder dark:bg-black text-textColor rounded-md mx-[100px]">
      <table className="min-w-full bg-white dark:bg-black">
        <thead>
          <tr className="border-2 dark:border-redBorder dark:bg-black text-textColor">
            <th className="p-3 border-2 border-redBorder">sl.no</th>
            <th className="p-3 border-2 border-redBorder">Trainer Name</th>
            <th className="p-3 border-2 border-redBorder">Email</th>
            <th className="p-3 border-2 border-redBorder">Certificate</th>
            <th className="p-3 border-2 border-redBorder">Action</th>
            <th className="p-3 border-2 border-redBorder">Approval</th>
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
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-semibold text-textColor border-2 border-redBorder rounded disabled:opacity-50 dark:bg-black"
        >
          Previous
        </button>
        <span className="font-semibold text-textColor">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-semibold text-textColor border-2 border-redBorder rounded disabled:opacity-50 dark:bg-black"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Trainers;
