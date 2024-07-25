import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import apiServices from '../../apiServices/apiServices';

const Wallet = () => {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [userCache, setUserCache] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user.userId) {
      apiServices.getUser(user.userId)
        .then((response) => {
          setUserData(response.data.data);
          return apiServices.getUserTransactions(user.userId)
        })
        .then((response) => {
          setTransactions(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          toast.error("Failed to fetch data");
        });
    }
  }, [user]);


  return (
    <div className='m-10 text-textColor border border-white rounded-lg p-10'>
      <div>
        <h1 className='text-white text-3xl lg:text-4xl pb-4'>MY WALLET</h1>
      </div>

      <div className="lg:flex gap-4 items-stretch">
        <div className="bg-cardBgColor md:p-2 p-6 rounded-lg border border-red-600 mb-4 lg:mb-0 shadow-md lg:w-[35%]">
          <div className="flex justify-center items-center space-x-5 h-full text-textColor">
            <div>
              <p>Current Balance</p>
              <h2 className="text-4xl font-bold text-white">{userData.wallet ? userData.wallet : 0} Rs</h2>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="white" className="size-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
            </svg>
          </div>
        </div>

        <div className="bg-cardBgColor p-4 rounded-lg xs:mb-4 max-w-full shadow-md lg:w-[65%]">
          <div className="flex flex-wrap justify-between h-full">
            <button className=" flex-1 rounded-lg flex flex-col bg-green-700 items-center justify-center p-2 border border-green-800 m-2 cursor-pointer hover:bg-green-600 hover:scale-105 ">
              <p className="text-white text-xl ">RECHARGE WALLET</p>
            </button>
            
          </div>
        </div>
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
              <th className="px-4 py-2 text-left border-b-2">
                <h2 className="text-ml font-bold text-white">Payment To</h2>
              </th>
              <th className="px-4 py-2 text-right border-b-2">
                <h2 className="text-ml font-bold text-white">Amount</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 text-left align-top">
                  <div>
                    <h2 className="text-white">{transaction.description}</h2>
                    <p className="text-gray-400">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                  </div>
                </td>
                <td className="px-4 py-2 text-left align-top text-white">
                  {transaction.transactionType}
                </td>
                <td className="px-4 py-2 text-left align-top text-white">
                  {transaction.paymentMethod}
                </td>
                <td className="px-4 py-2 text-left align-top text-white">
                  {transaction.userId.username}
                </td>
                <td className={`px-4 py-2 text-right ${transaction.transactionType === 'refund' ? "text-green-500" : 'text-red-500'}`}>
                  <span>{transaction.transactionType === 'refund' ? `+${transaction.amount}` : `-${transaction.amount}`}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wallet;
