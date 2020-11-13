const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    title: {type: String, required: true, maxlength: 100},
    timestamp: {type: Date, default: Date.now},
    text: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  }
);

//Export model
module.exports = mongoose.model('Message', MessageSchema);
