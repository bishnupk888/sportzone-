const User = require('../model/userModel');
const Trainer = require('../model/trainerModel');
const Booking = require('../model/bookingModel');
const Slots = require('../model/slotModel');
const Stripe = require('stripe');

const slotController = require('../controller/slotControllers');
const Transaction = require('../model/transactionModel');

const getCheckoutSession = async (req, res) => {
    console.log(req.body.checkoutData);
    const { userId, trainerId, totalAmount, slotIds } = req.body.checkoutData;
    try {
        if (!userId || !trainerId || !totalAmount || !slotIds || slotsQuantity === 0) {
            return res.status(400).json({ success: false, message: "Missing required checkout data" });
        }
        const slotsQuantity = slotIds.length
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found while creating checkout session" });
        }
        const trainer = await Trainer.findById(trainerId);
        if (!trainer) {
            return res.status(404).json({ success: false, message: "Trainer not found while creating checkout session" });
        }
        // Initialize Stripe correctly with your secret key
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        // stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}/user/checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/trainers/${trainer._id}`,
            customer_email: user.email,
            client_reference_id: trainerId, // passed from checkout
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
        });  

        if (!session) {
            const transaction = new Transaction({
                userId: user._id,
                bookingId: null,
                amount: totalAmount,
                paymentMethod: 'online',
                transactionType: 'payment',
                status: 'failed',
                failureReason: 'Error creating checkout session'
            });
            await transaction.save();
            return res.status(500).json({ success: false, message: "Error creating checkout session" });
        }
        if(session){
        const booking = new Booking({
            userId: user._id,
            trainerId: trainer._id,
            slots: slotIds,
            bookingAmount: totalAmount,
            session: session.id,
            bookingStatus: 'success',
            bookingDate: new Date()   
        });

        await slotController.updateSlots(slotIds)
        
        await booking.save();
        const transaction = new Transaction({
            userId:booking.userId,
            bookingId:booking._id,
            amount:booking.bookingAmount,
            paymentMethod: 'online',
            transactionType:'payment',
            status:'success'
          })
          await transaction.save()

       return res.status(200).json({ success: true, message: "Successfully booked and paid", session });
    }
    else{
        res.status(500).json({ success: false, message: "Error creating checkout session" });
    }
        
    } catch (error) {
       console.error("Error creating checkout session:", error);

        if (error.type === 'StripeCardError') {
            return res.status(400).json({ success: false, message: "Card error: " + error.message });
        }

        res.status(500).json({ success: false, message: "Error creating checkout session" });
    }
};

const walletBooking = async(req,res)=>{
            const {userId,trainerId,slotIds,totalAmount} =req.body.checkoutData
        try {
            const slotsQuantity = slotIds.length
            const user = await User.findById(userId);
            const trainer = await Trainer.findById(trainerId);

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

                return res.status(200).json({ success: true, message: "Successfully booked and paid"});
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"server error booking failed"})
        }
}




module.exports = {
    getCheckoutSession,
    walletBooking
};
