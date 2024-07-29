import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import apiServices from '../../apiServices/apiServices';

const TrainerWallet = () => {
  const user = useSelector((state) => state.user);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const transactionsPerPage = 10; 

  useEffect(() => {
    if (user.userId) {
      apiServices.getTrainerTransactions(user.userId) 
        .then((response) => {
          setTransactions(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [user]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * transactionsPerPage;
  const currentTransactions = transactions.slice(offset, offset + transactionsPerPage);
  const pageCount = Math.ceil(transactions.length / transactionsPerPage);

  return (
    <>
      <style>
        {`
          .pagination {
            display: flex;
            justify-content: center;
            list-style-type: none;
            padding: 0;
            margin: 10px 0;
          }

          .pagination li {
            display: inline-block;
            margin: 0 5px;
          }

          .pagination li a {
            padding: 10px 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            color: #333;
          }

          .pagination li a:hover {
            background-color: #f0f0f0;
          }

          .pagination li.active a {
            background-color: red;
            color: white;
            border-color: red;
          }
        `}
      </style>

      <div className='m-10 text-textColor border border-redBorder rounded-lg p-10'>
        <div>
          <h1 className='text-white text-3xl lg:text-4xl pb-4'>TRANSACTIONS</h1>
        </div>

        <div className="bg-cardBgColor rounded-lg p-4 shadow-md my-4">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border-b-2">
                  <h2 className="text-ml font-bold text-white">Transaction Date</h2>
                </th>
                <th className="px-4 py-2 text-left border-b-2">
                  <h2 className="text-ml font-bold text-white">Transaction Type</h2>
                </th>
                <th className="px-4 py-2 text-left border-b-2">
                  <h2 className="text-ml font-bold text-white">Payment Type</h2>
                </th>
                <th className="px-4 py-2 text-right border-b-2">
                  <h2 className="text-ml font-bold text-white">Amount</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 text-left align-top">
                      <div>
                        <h2 className="text-white">{transaction.description }</h2>
                        <p className="text-gray-400">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-left align-top text-white">
                      {transaction.transactionType}
                    </td>
                    <td className="px-4 py-2 text-left align-top text-white">
                      {transaction.paymentMethod}
                    </td>
                    <td className={`px-4 py-2 text-right ${transaction.transactionType === 'payment' ? "text-green-500" : 'text-red-500'}`}>
                      <span>{transaction.transactionType === 'refund' ? `-${transaction.amount}` : `+${transaction.amount}`}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center text-gray-400">No transactions data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={10}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default TrainerWallet;
