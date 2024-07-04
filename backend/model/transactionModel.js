const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // trainerId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Trainer',
    //     required: true,
    // },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum:['online', 'wallet'],
        required: true,
    },
    transactionType: {
        type: String,
        enum: ['payment', 'refund' ],
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
