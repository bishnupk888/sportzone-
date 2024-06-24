const User = require('../model/userModel');
const Trainer = require('../model/trainerModel');
const Booking = require('../model/bookingModel');
const Slots = require('../model/slotModel');
const Stripe = require('stripe');
const slotController = require('../controller/slotControllers')

const getCheckoutSession = async (req, res) => {
    try {
        console.log(req.body.checkoutData);
        const { userId, trainerId, totalAmount, slotIds } = req.body.checkoutData;
        const slotsQuantity = slotIds.length
        const user = await User.findById(userId);
        const trainer = await Trainer.findById(trainerId);
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
                    unit_amount: trainer.fee * 100,
                    product_data: {
                        name: trainer.username,
                        description: trainer.department,
                        images: [trainer.profileImage]
                    }
                },
                quantity: slotsQuantity
            }]
        });  

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




module.exports = {
    getCheckoutSession
};
