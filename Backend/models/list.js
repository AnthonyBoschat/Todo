const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  folderID: { type: String, required: true },
  userID: {type:String, required: true},
  position:{type:Number, required:true},
  items:{type: Object, default: {}}
});

const List = mongoose.model('List', listSchema);

module.exports = List;