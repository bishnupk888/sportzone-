const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 
const Booking = require('../model/bookingModel'); 


const verifyPayment = async (req, res) => {
  try {

    console.log("in verify payment")
    const { paymentIntentId } = req.body; 

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);


    if (paymentIntent.status === 'succeeded') {
      // Update the booking status in your database
      await Booking.updateOne(
        { paymentIntentId: paymentIntentId },
        { status: 'Paid' }
      );

      // Send success response
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      // Payment is not successful, handle accordingly
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = { verifyPayment };