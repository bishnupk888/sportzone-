const Slot = require('../../model/slotModel')
const User = require('../../model/userModel')
const Booking = require('../../model/bookingModel')

const getTrainerSlots = async(req,res)=>{
    const {id} = req.params
  try {
    const slots = await Slot.find({trainerId:id})
   
    res.status(200).json({message:"found slots", data:slots})
  } catch (error) {
    res.status(400).json({message:"error finding slots"})
  }
} 
const  bookSlot = async (req, res) => {
    const { userId, slotId } = req.body;
    try {
        const user = await User.findById(userId);
        const slot = await Slot.findById(slotId);

        if (!user || !slot) {
            return res.status(404).json({ message: 'User or slot not found' });
        }

        const newBooking = new Booking({
            userId,
            slotId,
        });
        await newBooking.save();

        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }

   
}


module.exports={
    getTrainerSlots,
    bookSlot
}