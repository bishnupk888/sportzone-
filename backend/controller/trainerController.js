const Trainer = require('../model/trainerModel')

const updateTrainer = async (req, res) => {
    const {id} = req.params
    try {
        const updatedTrainer = await Trainer.findByIdAndUpdate(id, { $set: req.body }, { new: true }).select('-password')
        res.status(200).json({ data: updatedTrainer, message: "successfully updated" })
    } catch (error) {
        res.status(400).json({ message: "failed to update" })
    }
}

const getTrainer = async (req, res) => {
    console.log("in getTrainer ");
    const { id } = req.params
    try {
        const trainer = await Trainer.findById(id).select('-password')
        console.log("trainer:",trainer);
        if(trainer){
          return  res.status(200).json({ data: trainer, message: "trainer found", success: true })
        }else{
         return res.status(404).json({ message: "trainer not found" })
        }
        
    } catch (error) {
        res.status(404).json({ message: "server error" })
    }
}



const getAllTrainers = async (req, res) => {
    console.log("in get trainer ");
    try {
        const trainers = await Trainer.find({}).select('-password')
        if (trainers.length>0) {
            return res.status(200).json({ data: trainers, message: "trainer found", success: true })
        } else {
            return res.status(404).json({ message: "trainers not found" })
        }
    } catch (error) {
        res.status(404).json({ message: "server error" })
    }
}

module.exports = {
    updateTrainer,
    getTrainer,
    getAllTrainers
}
