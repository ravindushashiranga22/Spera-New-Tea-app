const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: {  type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false },
  isAccepted:{ type: Boolean, default:false},
  isCanceled:{ type: Boolean, default:false},
  userRole:{type:String, default:null},
  // userId:{type:String, default:null},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 

  
  
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order; // Use module.exports for CommonJS
