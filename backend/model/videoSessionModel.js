const mongoose = require('mongoose');

const videoCallSessionSchema = new mongoose.Schema({
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videoCallSessionId: {
    type: String,
    required: true,
    unique: true
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

// Set an index on expiresAt to automatically delete expired sessions
videoCallSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const VideoCallSession = mongoose.model('VideoCallSession', videoCallSessionSchema);

module.exports = VideoCallSession;
