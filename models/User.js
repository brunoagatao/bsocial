const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  memberId: {
    type: String,
    default: shortid.generate
  },
  friends: [
    {
      memberId: {
        type: String,
        required: true
      },
      friendName: {
        type: String,
        required: true
      },
      profilePic: {
        type: String,
        required: true
      }
    }
  ],
  friendRequests: [
    {
      memberId: {
        type: String,
        required: true
      },
      friendName: {
        type: String,
        required: true
      },
      profilePic: {
        type: String,
        required: true
      }
    }
  ],
  userProfile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;