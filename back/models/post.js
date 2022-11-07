const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      max: 1500,
    },
    imageUrl: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    usersLiked: {
      type: [String],
      require: true,
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model('posts', postSchema);


