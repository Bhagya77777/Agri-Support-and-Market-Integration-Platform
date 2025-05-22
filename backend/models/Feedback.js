const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required']
  },
  feedback: {
    type: String,
    required: [true, 'Feedback is required']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Rating is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedbacks', FeedbackSchema);