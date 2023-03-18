import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true
  },
  itemId: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  dueAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model('notification', notificationSchema);

export default Notification;