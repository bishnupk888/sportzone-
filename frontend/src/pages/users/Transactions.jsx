import React from 'react';

const StockTable = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">Stock Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            <tr className="border-b border-blue-gray-200">
              <td className="py-3 px-4">Company A</td>
              <td className="py-3 px-4">$50.25</td>
              <td className="py-3 px-4">100</td>
              <td className="py-3 px-4">$5025.00</td>
              <td className="py-3 px-4">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Edit</a>
              </td>
            </tr>
            <tr className="border-b border-blue-gray-200">
              <td className="py-3 px-4">Company B</td>
              <td className="py-3 px-4">$75.60</td>
              <td className="py-3 px-4">150</td>
              <td className="py-3 px-4">$11340.00</td>
              <td className="py-3 px-4">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Edit</a>
              </td>
            </tr>
            <tr className="border-b border-blue-gray-200">
              <td className="py-3 px-4">Company C</td>
              <td className="py-3 px-4">$30.80</td>
              <td className="py-3 px-4">200</td>
              <td className="py-3 px-4">$6160.00</td>
              <td className="py-3 px-4">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Edit</a>
              </td>
            </tr>
            {/* Add more rows as needed */}
            <tr className="border-b border-blue-gray-200">
              <td className="py-3 px-4 font-medium">Total Wallet Value</td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4 font-medium">$22525.00</td>
              <td className="py-3 px-4"></td>
            </tr>
          </tbody>
        </table>
        <div className="w-full pt-5 px-4 mb-8 mx-auto ">
          <div className="text-sm text-gray-700 py-1 text-center">
            Made with <a className="text-gray-700 font-semibold" href="https://www.material-tailwind.com/docs/html/table/?ref=tailwindcomponents" target="_blank" rel="noopener noreferrer">Material Tailwind</a> by <a href="https://www.creative-tim.com?ref=tailwindcomponents" className="text-gray-700 font-semibold" target="_blank" rel="noopener noreferrer"> Creative Tim</a>.
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockTable;
