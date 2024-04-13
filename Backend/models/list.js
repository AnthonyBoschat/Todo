const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  folderID: { type: String, required: true },
  userID: {type:String, required: true},
});

const List = mongoose.model('List', listSchema);

module.exports = List;