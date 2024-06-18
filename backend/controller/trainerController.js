const Trainer = require('../model/trainerModel')


    const updateTrainer = async (req, res) => {
        const { id } = req.params; // Extract trainer ID from request parameters   
        try {
            const updatedTrainer = await Trainer.findByIdAndUpdate(
                id,
                { $set: req.body }, // Update with the contents of req.body
                { new: true } // Return the updated document
            );
    
            console.log(updatedTrainer); // Log the updated trainer data
       
            if (!updatedTrainer) {
                // Handle case where Trainer with given ID is not found
                return res.status(404).json({ message: "Trainer not found" });
            }
    
            res.status(200).json({ data: updatedTrainer, message: "Successfully updated" });
        } catch (error) {
            console.error("Error updating trainer:", error);
            res.status(400).json({ message: "Failed to update" });
        }
    };
    
const getTrainer = async (req, res) => {
    const { id } = req.params
    try {
        const trainer = await Trainer.findById(id).select('-password')
        if(trainer){
          return  res.status(200).json({ data: trainer, message: "trainer found", success: true })
        }else{
         return res.status(404).json({ message: "trainer not found" })
        }
        
    } catch (error) {
        res.status(404).json({ message: "server error" })
    }
}



const updateProfileImage = async (req, res) => {
    
    const { id } = req.params;
    const { imageUrl } = req.body; 
    try {
      const user = await Trainer.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.profileImage = imageUrl;

      await user.save();

      res.status(200).json({ message: 'Profile image updated successfully', user });
    } catch (error) {
      console.error('Error updating profile image:', error);
      res.status(500).json({ message: 'Failed to update profile image', error });
    }
  };

  const updateCertificate = async (req, res) => {
    const { id } = req.params;
    const { certificateUrl } = req.body; 
    try {
      const trainer = await Trainer.findById(id);
  
      if (!trainer) {
        return res.status(404).json({ message: 'Trainer not found' });
      }
      trainer.certificate = certificateUrl;
      trainer.isVerified = false
      await trainer.save();
      res.status(200).json({ message: 'Certificate uploaded successfully', trainer });
    } catch (error) {
      console.error('Error uploading certificate:', error);
      res.status(500).json({ message: 'Failed to upload certificate', error });
    }
  };
  

module.exports = {
    updateTrainer,
    getTrainer,
    updateProfileImage,
    updateCertificate
}


