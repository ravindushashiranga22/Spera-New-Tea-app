const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    isAccepted: { type: Boolean, default: false },
    isCanceled: { type: Boolean, default: false },
    isCanceledByUser: { type: Boolean, default: false },
    cancelReason: { type: String },
    ispredefinedReasons: { type: Boolean, default: false },
    userRole: { type: String, default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // This will automatically add createdAt and updatedAt fields
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
