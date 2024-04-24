const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  folderID: { type: String, required: true },
  userID: {type:String, required: true},
  position:{type:Number, required:true},
  items:{type: Object, default: {}}
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;