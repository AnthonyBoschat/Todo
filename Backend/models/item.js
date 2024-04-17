const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  content: { type: String, required: true },
  completed: { type: Boolean, default: false },
  onWorking: {type:Boolean, default: false},
  folderID: {type: String, required: true},
  userID:{type:String, required:true},
  position:{type:Number, required:true},
  properties:[{
    propertyID:{type:mongoose.Types.ObjectId},
    name:{type:String},
    value:{type:String},
  }]
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;