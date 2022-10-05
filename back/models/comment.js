const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      max: 600,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('comment', commentSchema);
