const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {type: String, required: true, maxlength: 100},
    first_name: {type: String, required: true, maxlength: 100},
    last_name: {type: String, required: true, maxlength: 100},
    password: {type: String, required: true, maxlength: 100},
    membership_status: {type: String, required: true, enum: ['Admin', 'Member', 'Non-Member'], default: 'Non-Member'},
  }
);

//Export model
module.exports = mongoose.model('User', UserSchema);
