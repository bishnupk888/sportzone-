const { updateCancelledSlots } = require('../../controller/slotControllers');
const Booking = require('../../model/bookingModel');
const Slot = require('../../model/slotModel'); // Ensure the Slot model is correctly imported
const Trainer = require('../../model/trainerModel');
const Transaction = require('../../model/transactionModel');
const User = require('../../model/userModel');

const getAllUserBookings = async (req, res) => {
  const { id } = req.params;
 
  try {
    let bookings = await Booking.find({ userId: id })
      .populate('trainerId', 'username email profileImage')
      .exec();

    // Manually populate slots
    for (let booking of bookings) {
      const populatedSlots = await Slot.find({ _id: { $in: booking.slots } }).exec();
      booking.slots = populatedSlots;

      // Divide the booking amount by the number of slots
      const slotCount = booking.slots.length;
      if (slotCount > 0) {
        booking.bookingAmount = booking.bookingAmount / slotCount;
      }
    }

    // Format booking date
    bookings.forEach(booking => {
      booking.bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-GB');
    });

    console.log(bookings);

    if (bookings.length) {
      return res.status(200).json({ message: "bookings found", data: bookings });
    } else {
      return res.status(404).json({ message: "bookings not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error, bookings not found" });
  }
};

const cancelUserBooking = async (req, res) => {
  const { bookingId } = req.params;
  console.log(bookingId,"in cancel booking");
  try {
    const booking = await Booking.findById(bookingId);
    console.log(booking);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.bookingStatus = 'cancelled';
    await booking.save();

    const user = await User.findById(booking.userId);
    console.log("user:=+++ ",user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.wallet += booking.bookingAmount;
    await updateCancelledSlots(booking.slots)
    await user.save();
    const transaction = new Transaction({
      userId:booking.userId,
      bookingId:booking._id,
      amount:booking.bookingAmount,
      paymentMethod: 'wallet',
      transactionType:'refund',
      status:'success'
    })

    await transaction.save()

    res.status(200).json({ message: "Booking cancelled and wallet updated" ,success:true});
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getBookingDetails = async (req, res) => {
  console.log("get booking details");
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    console.log(booking.slots);

    if (!booking) {
      return res.status(400).json({ message: 'failed to get booking details' });
    } else {
      const slotDetails = await Promise.all(
        booking.slots.map(async (slotId) => {
          const slot = await Slot.findById(slotId);
          return slot;
        })
      );

      trainerDetails = await Trainer.findById(booking.trainerId)

      console.log("trainer :",trainerDetails);

      // Include the slot details in the booking object
      booking.slots = slotDetails;
      booking.trainerId = trainerDetails

      res.status(200).json({ message: "successfully fetched booking details", data: booking });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error, failed to get booking details' });
  }
};



module.exports = {
    getAllUserBookings,
    cancelUserBooking,
    getBookingDetails
};
