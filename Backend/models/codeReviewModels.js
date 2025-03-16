const mongoose = require('mongoose');

const CodeReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  codeQuestion: {
    type: String,
    required: true,
  },
  userAnswer:{
	type:String,

  },
  reviewFeedback: {
    type: String,
  },

  qualityScore: {
    type: Number,
  },
  
},{timestamps:true});

module.exports = mongoose.model('CodeReview', CodeReviewSchema);
