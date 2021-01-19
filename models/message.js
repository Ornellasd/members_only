const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    title: {type: String, required: true, maxlength: 100},
    text: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  }
);

MessageSchema
.virtual('formatted_timestamp')
.get(function() {
  const date = new Date();
  return date.toLocaleDateString();
});

module.exports = mongoose.model('Message', MessageSchema);
