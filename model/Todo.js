var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default:false, required: true },
  created_at:{
      type:Date,
      default: Date.now
  }
});

var Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;