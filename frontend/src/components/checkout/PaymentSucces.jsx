import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiServices from '../../apiServices/apiServices';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const paymentIntentId = new URLSearchParams(location.search).get('payment_intent');
        const response = await apiServices.verifyPayment();

        if (response.data.success) {
          navigate('/user/checkout-success');
        } else {
          navigate('/payment-failed');
        }
      } catch (error) {
        console.error('Payment verification failed:', error);
        navigate('/payment-failed');
      }
    };

    verifyPayment();
  }, [navigate, location]);

  return <div>Verifying Payment...</div>;
};

export default PaymentSuccess;