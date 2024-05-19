import React, { useState } from 'react';

const Athletes = () => {
  // Sample data for athletes
  const [athletes, setAthletes] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    // Add more athletes as needed
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Athletes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black text-white border border-red-500">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-red-500">SL. No</th>
              <th className="px-4 py-2 border-b border-red-500">Name</th>
              <th className="px-4 py-2 border-b border-red-500">Email</th>
              <th className="px-4 py-2 border-b border-red-500">Phone</th>
              <th className="px-4 py-2 border-b border-red-500">Options</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((athlete, index) => (
              <tr key={athlete.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}>
                <td className="px-4 py-2 border-b border-red-500 text-center">{index + 1}</td>
                <td className="px-4 py-2 border-b border-red-500">{athlete.name}</td>
                <td className="px-4 py-2 border-b border-red-500">{athlete.email}</td>
                <td className="px-4 py-2 border-b border-red-500">{athlete.phone}</td>
                <td className="px-4 py-2 border-b border-red-500 text-center">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="text-red-500 hover:underline ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Athletes;
