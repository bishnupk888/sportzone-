const Transaction = require('../../model/transactionModel');

const mongoose = require('mongoose');

const getAllTransactions = async (req, res) => {
    const { userId } = req.params;

    try {
        // Use the `new` keyword to create ObjectId
        const trainerObjectId = new mongoose.Types.ObjectId(userId);

        // Fetch all transactions and populate bookingId with trainerId
        const transactions = await Transaction.find({})
            .populate({
                path: 'bookingId',
                select: 'trainerId'
            });

        // Filter transactions based on trainerObjectId
        const filteredTransactions = transactions.filter(transaction => {
            if (!transaction.bookingId || !transaction.bookingId.trainerId) {
                console.warn('Missing bookingId or trainerId:', transaction);
                return false;
            }

            return transaction.bookingId.trainerId.equals(trainerObjectId);
        });

        if (filteredTransactions.length === 0) {
            return res.status(404).json({ message: "No transactions found for the trainer", data: [] });
        }

        return res.status(200).json({ message: "Successfully fetched transactions", data: filteredTransactions });

    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: "Server error, failed to fetch transactions" });
    }
};




module.exports = {
    getAllTransactions
}