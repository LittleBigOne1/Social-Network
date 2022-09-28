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
      max: 600,
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
    comments:{
      type: [
        {commenterId: String,
        commenterFirstName: String,
        commenterLastName: String,
        commenterProfilePicture: String,
        text: String,
        timestamp: Number,
      }
      ]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('posts', postSchema);


