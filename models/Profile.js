const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfleSchema = new Schema({
  location: {
    type: String,
    default: 'None'
  },
  description: {
    type: String,
    default: 'None'
  },
  interests: {
    type: String,
    default: 'None'
  },
  profilePic: {
    type: String,
    default: 'default_profile.png'
  },
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;