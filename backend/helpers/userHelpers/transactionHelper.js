const Transaction = require('../../model/transactionModel');

const getAllTransactions = async(req,res)=>{
  const {userId} = req.params
    try {
        const transactions = await Transaction.find({userId:userId}).populate('userId','username')
    if (!transactions) {
        return res.status(400).json({message:"failed to fetch transactions"})
    }
    else{
        return res.status(200).json({message:"successfully fetch transactions",data:transactions})
    }
    } catch (error) {
        res.status(500).json({message:"server error failed to fetch transactions"})
    }
}

module.exports = {
    getAllTransactions
}