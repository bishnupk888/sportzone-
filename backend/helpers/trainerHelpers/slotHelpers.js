const Slot = require('../../model/slotModel')


const getTrainerSlots = async(req,res)=>{
    const {id} = req.params
  try {
    const slots = await Slot.find({trainerId:id}).sort({createdAt:-1})
   
    res.status(200).json({message:"found slots", data:slots})
  } catch (error) {
    res.status(400).json({message:"error finding slots"})
  }
} 

const addSlots = async (req, res) => {
    try {
      const { date, startTime, endTime, trainerId } = req.body;

      const newSlot = new Slot({ date, startTime, endTime, trainerId });
     const savedSlot =  await newSlot.save();
      res.status(201).json(newSlot);
    } catch (error) {
      res.status(500).json({ message: 'Error adding slot', error });
    }
  };

  const deleteSlot =  async (req, res) => {
    try {
      const { id } = req.params;
      const slot = await Slot.findById(id)
      if(slot.isBooked){
        return res.status(400).json({ message: 'cannot delete already booked slot' });
      }
      const deletedSlot = await Slot.findByIdAndDelete(id);
      if (!deletedSlot) {
        return res.status(404).json({ message: 'Slot not found' });
      }
      res.status(200).json({ message: ' Deleted lot successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting slot', error });
    }
  };

  const editSlot = async (req, res) => {
    try {
      
      const { slotId } = req.params; 
      const { date, startTime, endTime } = req.body 

      const updatedSlot = await Slot.findByIdAndUpdate(
        slotId,
        { date, startTime, endTime },
        { new: true } 
      );
  
      if (!updatedSlot) {
        return res.status(404).json({ message: 'Slot not found' });
      }
      res.status(200).json(updatedSlot);
    } catch (error) {
      res.status(500).json({ message: 'Error editing slot', error });
    }
  };


  module.exports ={
    addSlots,
    deleteSlot,
    getTrainerSlots,
    editSlot

  }
