import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosInstance/axiosInstance';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('online');
  const user = useSelector((state) => state.user);
  console.log(user);

 

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };
  const location = useLocation();
  const { selectedSlots = [], totalAmount ,trainerId} = location.state || {};

  const slotIds =  selectedSlots.map((slot)=>{
    return slot._id
})


const checkoutData = {
    userId:user.userId,
     trainerId ,
     slotIds,
     totalAmount}

  const handlePayment = async () =>  {
    try {
        console.log(totalAmount, user.wallet , );
    if( paymentMethod === 'wallet' && !user.wallet){
        toast.warning('insufficient wallet balance')
    }
    else if(user.wallet < totalAmount ) {
        toast.warning('insufficient wallet balance')
    }else{
        if(paymentMethod === 'online'){
            console.log('Proceeding to payment with payment method :',paymentMethod,"   userId: ",user.userId,  "   trainer ID:",trainerId ,"    slotIds : ",slotIds , "    amount : ",totalAmount,);
             axiosInstance.post('/api/bookings/checkout-session',{checkoutData})
             .then((response)=>{
                console.log(response.data);
                const data = response.data
                if(response.data.session.url){
                    window.location.href = data.session.url
                }
             })   
             .catch((err=>{
                console.log(" error creating checkout session : ",error);
             }))
        }
    }
    } catch (error) {
        console.log(error);
    }
    
    // Handle payment logic
  };
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className='px-20 lg:px-60'>
    <div className="container mx-auto border border-redBorder rounded-lg p-10 my-10 bg-black shadow-lg  max-w-[500px]">
      <h2 className="text-4xl font-bold mb-6 text-start text-highlightTextColor">Checkout</h2>

      <div className="bg-black bg-buttonBgColor shadow-inner rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-semibold mb-4 text-highlightTextColor">Selected Slots</h3>
        <ul className="list-disc list-inside text-white">

          {selectedSlots.map((slot, index) => (
            <li key={index} className="mb-2">
              <span className="font-medium">{formatDate(new Date(slot.date))}</span> : {slot.startTime} - {slot.endTime}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-buttonBgColor  shadow-inner rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-semibold mb-4 text-textColor">Total Amount</h3>
        <p className="text-xl text-highlightTextColor" >₹{totalAmount}</p>
      </div>

      <div className="bg-buttonBgColor shadow-inner rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-semibold mb-4 text-textColor">Payment Method</h3>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="online"
            name="paymentMethod"
            value="online"
            checked={paymentMethod === 'online'}
            onChange={() => handlePaymentMethodChange('online')}
            className="mr-2"
          />
          <label htmlFor="online" className="mr-6 text-lg text-textColor">
            Online Payment
          </label>

          <input
            type="radio"
            id="wallet"
            name="paymentMethod"
            value="wallet"
            checked={paymentMethod === 'wallet'}
            onChange={() => handlePaymentMethodChange('wallet')}
            className="mr-2"
          />
          <label htmlFor="wallet" className="text-lg text-textColor">
            Wallet Payment (Balance: ₹{user.wallet?user.wallet : 0})
          </label>
        </div>
      </div>

      <div className="text-end">
        <button
          onClick={handlePayment}
          className="bg-green-500 border border-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-black hover:border-green500 hover:text-green-500 shadow-md"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
    </div>
  );
};

export default CheckoutPage;
