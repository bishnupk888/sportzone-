const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    trainerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer',
        required: true,
    },
    slots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true,
    }],
    bookingAmount:{
        type:Number,
    },
    session:{
        type:String
    },
    bookingStatus:{
        type:String,
        enum:['pending','success','cancelled','failed'],
        default:'pending'
    },
    bookingDate: {
        type: Date,
        default: Date.now,
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
