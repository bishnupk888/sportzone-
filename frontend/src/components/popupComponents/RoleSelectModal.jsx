import React from 'react';
import { toast } from 'react-toastify';

const RoleSelectModal = ({ isOpen, onClose, onRoleSelect, selectedRole }) => {
  if (!isOpen) return null;

  const handleRoleChange = (e) => {
    onRoleSelect(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-black border border-red-500 rounded-lg shadow-lg p-6 w-96 text-white hover:scale-105">
        <h2 className="text-xl font-semibold mb-4">Login As</h2>
        <p className="mb-4">Please select your role to proceed with the Login.</p>
        <div className="mb-4 flex flex-row ">
          <label className="flex items-center mb-2 px-4 text-white">
            <input
              type="radio"
              name="role"
              value="user"
              checked={selectedRole === 'user'}
              onChange={handleRoleChange}
              className="mr-2 appearance-none h-5 w-5 border-2 border-gray-300 rounded-full checked:bg-green-500 checked:border-white focus:outline-none  focus:ring-gray-200"
            />
            User
          </label>
          <label className="flex items-center mb-2 text-white">
            <input
              type="radio"
              name="role"
              value="trainer"
              checked={selectedRole === 'trainer'}
              onChange={handleRoleChange}
              className="mr-2 appearance-none h-5 w-5 border-2 border-gray-300 rounded-full checked:bg-green-500 checked:border-white focus:outline-none  focus:ring-gray-200"
            />
            Trainer
          </label>
        </div>
        <div className="flex justify-end">
          
          <button
            onClick={() => {
              if (!selectedRole) {
                toast.error("Select role");
              } else {
                onClose();
              }
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:scale-105"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectModal;
