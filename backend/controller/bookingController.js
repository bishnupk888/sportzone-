const User = require('../model/userModel');
const Trainer = require('../model/trainerModel');
const Booking = require('../model/bookingModel');
const Slot = require('../model/slotModel')
const Stripe = require('stripe');
// const Stripe = require('stripe')(process.env.VITE_STRIPE_SECRET_KEY);
const slotController = require('../controller/slotControllers');
const Transaction = require('../model/transactionModel');
const axios = require('axios')

// const getCheckoutSession = async (req, res) => {
//     const { userId, trainerId, totalAmount, slotIds } = req.body.checkoutData;
//     try {
//         const slotsQuantity = slotIds.length
//         if (!userId || !trainerId || !totalAmount || !slotIds || slotsQuantity === 0) {
//             return res.status(400).json({ success: false, message: "Missing required checkout data" });
//         }
       
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found while creating checkout session" });
//         }
//         const trainer = await Trainer.findById(trainerId);
//         if (!trainer) {
//             return res.status(404).json({ success: false, message: "Trainer not found while creating checkout session" });
//         }
//         const slot = await Slot.findById(slotIds[0])

//         const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//         // stripe session
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             mode: 'payment',
//             success_url: `${process.env.CLIENT_SITE_URL}/user/checkout-success`,
//             cancel_url: `${req.protocol}://${req.get('host')}/trainers/${trainer._id}`,
//             customer_email: user.email,
//             client_reference_id: trainerId, 
//             line_items: [{
//                 price_data: {
//                     currency: 'inr',
//                     unit_amount: totalAmount * 100,
//                     product_data: {
//                         name: trainer.username,
//                         description: trainer.department,
//                         images: [trainer.profileImage]
//                     }
//                 },
//                 quantity: slotsQuantity
//             }]
//         });  

//         if (!session) {
//             const transaction = new Transaction({
//                 userId: user._id,
//                 bookingId: null,
//                 amount: totalAmount,
//                 paymentMethod: 'online',
//                 transactionType: 'payment',
//                 status: 'failed',
//             });
//             await transaction.save();
//             return res.status(500).json({ success: false, message: "Error creating checkout session" });
//         }
//         if(session){
//         const booking = new Booking({
//             userId: user._id,
//             trainerId: trainer._id,
//             slots: slotIds,
//             bookingAmount: totalAmount,
//             session: session.id,
//             bookingStatus: 'success',
//             bookingDate: new Date()   
//         });

//         await slotController.updateSlots(slotIds)
        
//         await booking.save();
//         const transaction = new Transaction({
//             userId:booking.userId,
//             bookingId:booking._id,
//             amount:booking.bookingAmount,
//             paymentMethod: 'online',
//             transactionType:'payment',
//             status:'success'
//           })
//         await transaction.save()
//         const bookingDetails = {slot , user, trainer,}
//        return res.status(200).json({ success: true, message: "Successfully booked and paid", data:{session,bookingDetails} });
//     }
//     else{
//         res.status(500).json({ success: false, message: "Error creating checkout session" });
//     }
        
//     } catch (error) {
//        console.error("Error creating checkout session:", error);
//         if (error.type === 'StripeCardError') {
//             return res.status(400).json({ success: false, message: "Card error: " + error.message });
//         }
//         res.status(500).json({ success: false, message: "Error!! booking failed try again." });
//     }
// };


const getCheckoutSession = async (req, res) => {
    const { userId, trainerId, totalAmount, slotIds } = req.body.checkoutData;
    try {
        const slotsQuantity = slotIds.length;
        if (!userId || !trainerId || !totalAmount || !slotIds || slotsQuantity === 0) {
            return res.status(400).json({ success: false, message: "Missing required checkout data" });
        }
       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found while creating checkout session" });
        }
        const trainer = await Trainer.findById(trainerId);
        if (!trainer) {
            return res.status(404).json({ success: false, message: "Trainer not found while creating checkout session" });
        }
        const slot = await Slot.findById(slotIds[0])
        if (!slot) {
            return res.status(404).json({ success: false, message: "Slot not found while creating checkout session" });
        }
        
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        // stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}/user/checkout-success`,
            cancel_url: `${process.env.CLIENT_SITE_URL}/user/checkout-failure`,
            customer_email: user.email,
            client_reference_id: trainerId,
            line_items: [{
                price_data: {
                    currency: 'inr',
                    unit_amount: totalAmount * 100,
                    product_data: {
                        name: trainer.username,
                        description: trainer.department,
                        images: [trainer.profileImage]
                    }
                },
                quantity: slotsQuantity
            }]
        })
        let bookingId = null
        let transactionId = null
        if(session){
                    const booking = new Booking({
                        userId: user._id,
                        trainerId: trainer._id,
                        slots: slotIds,
                        bookingAmount: totalAmount,
                        session: session.id,
                        bookingStatus: 'pending',
                        bookingDate: new Date()   
                    });
                    const savedBooking = await booking.save();
                    bookingId = savedBooking._id

                    const transaction = new Transaction({
                        userId:booking.userId,
                        bookingId:booking._id,
                        amount:booking.bookingAmount,
                        paymentMethod: 'online',
                        transactionType:'payment',
                        status:'pending'
                      })
                   const savedTransaction = await transaction.save()
                   transactionId = savedTransaction._id

        }
        
        const bookingDetails = {user, trainer, slot, bookingId, transactionId }

        return res.status(200).json({ success: true, message: "Checkout session created", data: {session,bookingDetails} });

    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ success: false, message: "Error creating checkout session" });
    }
};

const bookingSuccess = async (req, res) => {
    const { bookingId, transactionId, slot } = req.body.bookingDetails
    try {
      const bookingUpdate = await Booking.findByIdAndUpdate(
        bookingId,
        { $set: { bookingStatus: 'success' } },
        { new: true }
      );
      console.log( "booking  update : ",bookingUpdate)
      if (!bookingUpdate) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      const transactionUpdate = await Transaction.findByIdAndUpdate(
        transactionId,
        { $set: { status: 'success' } },
        { new: true }
      );
  
      if (!transactionUpdate) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      const slotUpdate = await slotController.updateSlots(slot?._id, { isBooked: true });
      if (!slotUpdate) {
        return res.status(500).json({ error: "Failed to update slot availability" });
      }
    res.status(200).json({
        message: "Booking successfully updated",
        booking: bookingUpdate,
        transaction: transactionUpdate,
        slot: slotUpdate,
      });
  
    } catch (error) {
      console.error("Error in bookingSuccess:", error);
      res.status(500).json({ error: "An error occurred while processing the booking" });
    }
  };



// const handleStripeWebhook = async (req, res) => {
//     const payload = req.body;
//     const sig = req.headers['stripe-signature'];
//     let event;

//     try {
//         event = Stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
//     } catch (err) {
//         console.error("Webhook signature verification failed:", err);
//         return res.status(400).send(`Webhook error: ${err.message}`);
//     }

//     switch (event.type) {
//         case 'checkout.session.completed': {
//             const session = event.data.object;
//             // Handle successful payment here
//             const booking = new Booking({
//                 userId: session.metadata.userId,
//                 trainerId: session.client_reference_id,
//                 slots: JSON.parse(session.metadata.slotIds),
//                 bookingAmount: session.amount_total / 100,
//                 session: session.id,
//                 bookingStatus: 'success',
//                 bookingDate: new Date()
//             });
//             await booking.save();

//             const transaction = new Transaction({
//                 userId: booking.userId,
//                 bookingId: booking._id,
//                 amount: booking.bookingAmount,
//                 paymentMethod: 'online',
//                 transactionType: 'payment',
//                 status: 'success'
//             });
//             await transaction.save();

//             await slotController.updateSlots(JSON.parse(session.metadata.slotIds));
//             break;
//         }
//         case 'checkout.session.async_payment_failed': {
//             const session = event.data.object;
//             // Handle failed payment here
//             const transaction = new Transaction({
//                 userId: session.metadata.userId,
//                 bookingId: null,
//                 amount: session.amount_total / 100,
//                 paymentMethod: 'online',
//                 transactionType: 'payment',
//                 status: 'failed'
//             });
//             await transaction.save();
//             break;
//         }
//         default:
//             console.log(`Unhandled event type ${event.type}`);
//     }

//     res.json({ received: true });
// };
// const paymentWebhook = async((req,res)=>{
//     const event = req.body;
  
//     // Handle the event
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         const paymentIntent = event.data.object;
//         // Then define and call a method to handle the successful payment intent.
//         // handlePaymentIntentSucceeded(paymentIntent);
//         break;
//       case 'payment_method.attached':
//         const paymentMethod = event.data.object;
//         // Then define and call a method to handle the successful attachment of a PaymentMethod.
//         // handlePaymentMethodAttached(paymentMethod);
//         break;
//       // ... handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }
  
//     // Return a response to acknowledge receipt of the event
//     res.json({received: true});
//   });


const walletBooking = async(req,res)=>{
            const {userId,trainerId,slotIds,totalAmount} =req.body.checkoutData
        try {
            const slotsQuantity = slotIds.length
            const user = await User.findById(userId);
            const trainer = await Trainer.findById(trainerId);
            const slot = await Slot.findById(slotIds[0])

                if (!slotsQuantity) {
                  return res.status(404).json({ message: 'Slot not found' });
                }
            
                if (!user.wallet) {
                  return res.status(404).json({ message: 'Wallet not found' });
                }
                if (user.wallet < totalAmount) {
                  return res.status(400).json({ message: 'Insufficient wallet balance' });
                }
                // Deduct the amount from the wallet
                user.wallet -= totalAmount
                await user.save();

                const booking = new Booking({
                    userId: user._id,
                    trainerId: trainer._id,
                    slots: slotIds,
                    bookingAmount: totalAmount,
                    bookingStatus: 'success',
                    bookingDate: new Date()   
                })
                await slotController.updateSlots(slotIds)
                await booking.save();

                const transaction = new Transaction({
                    userId:booking.userId,
                    bookingId:booking._id,
                    amount:booking.bookingAmount,
                    paymentMethod: 'wallet',
                    transactionType:'payment',
                    status:'success'
                  })
                  await transaction.save()
                const bookingDetails = {slot , user, trainer}
                return res.status(200).json({ success: true, message: "Successfully booked and paid",data:{bookingDetails}});
        } catch (error) {
            console.error(error);
            res.status(500).json({message:"server error booking failed retry"})
        }
}






module.exports = {
    getCheckoutSession,
    walletBooking,
    bookingSuccess,
};
