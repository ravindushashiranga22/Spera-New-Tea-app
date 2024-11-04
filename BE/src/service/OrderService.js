const Order = require('../models/Orders');
const { emitMessageToClients } = require('../services/websocketServer');
const mongoose = require('mongoose');

const OrderService = {
  createOrder: async (orderData) => {
    console.log('Order -------------------------------- service file');

    // Emit a message to clients to notify about a new order
    emitMessageToClients({ type: "new-order-reload", message: 'Start making a new order' });

    const order = new Order(orderData);
    await order.save();

    return order;
  },

  // getOrders: async () => {
  //   // Fetch orders and populate the user role from userId field
  //   return await Order.find()
  //     .populate('userId', 'role')  // Populate userId field with role information
  //     .sort({ createdAt: -1 })
  //     .limit(100);
  // },



  getOrders : async () => {
    // Fetch orders and populate the user role from userId field
    const orders = await Order.find()
      .populate('userId')  // Populate userId field with role information
      .sort({ updatedAt: -1 })
      .limit(100);

      
  
    // Count occurrences of "milk-tea" and "plain-tea"
    let teaCounts = orders.reduce((acc, order) => {
      if (order.name === 'ප්ලේන් ටී' && order?.isCompleted==false && order?.isCanceled==false) {
        acc['ප්ලේන් ටී'] = (acc['ප්ලේන් ටී'] || 0) + order.quantity;
      } else if (order.name === 'කිරි තේ' && order?.isCompleted==false && order?.isCanceled==false) {
        acc['කිරි තේ'] = (acc['කිරි තේ'] || 0) + order.quantity;
      }
      else if (order.name === 'කෝපී' && order?.isCompleted==false && order?.isCanceled==false) {
        acc['කෝපී'] = (acc['කෝපී'] || 0) + order.quantity;
      }
      else if (order.name === 'කිරි කෝපී' && order?.isCompleted==false && order?.isCanceled==false) {
        acc['කිරි කෝපී'] = (acc['කිරි කෝපී'] || 0) + order.quantity;
      }
      return acc;
    }, {});

    teaCounts ={
      'ප්ලේන් ටී':teaCounts['ප්ලේන් ටී']?teaCounts['ප්ලේන් ටී']:0,
      'කිරි තේ':teaCounts['කිරි තේ']?teaCounts['කිරි තේ']:0,
      'කිරි කෝපී':teaCounts['කිරි කෝපී']?teaCounts['කිරි කෝපී']:0,
      'කෝපී':teaCounts['කෝපී']?teaCounts['කෝපී']:0,
    }

    console.log('-teaCounts',teaCounts)
  
    return { orders, teaCounts };
  },
  getOrdersById : async (id) => {
    // Fetch orders and populate the user role from userId field
    const orders = await Order.find( {userId: id , isCompleted: false} )
      .populate('userId', 'role')  // Populate userId field with role information
      .sort({ createdAt: -1 })
      .limit(100);

      
  
    // Count occurrences of "milk-tea" and "plain-tea"
    let teaCounts = orders.reduce((acc, order) => {
      if (order.name === 'ප්ලේන් ටී' && order?.isCompleted==false && order?.isCanceled==false) {
        acc['ප්ලේන් ටී'] = (acc['ප්ලේන් ටී'] || 0) + order.quantity;
      } else if (order.name === 'කිරි තේ' && order?.isCompleted==false && order?.isCanceled==false) {
        acc['කිරි තේ'] = (acc['කිරි තේ'] || 0) + order.quantity;
      }
      else if (order.name === 'කෝපී' && order?.isCompleted==false && order?.isCanceled==false) {
        acc['කෝපී'] = (acc['කෝපී'] || 0) + order.quantity;
      }
      else if (order.name === 'කිරි කෝපී' && order?.isCompleted==false && order?.isCanceled==false) {
        acc['කිරි කෝපී'] = (acc['කිරි කෝපී'] || 0) + order.quantity;
      }
      return acc;
    }, {});

    teaCounts ={
      'ප්ලේන් ටී':teaCounts['ප්ලේන් ටී']?teaCounts['ප්ලේන් ටී']:0,
      'කිරි තේ':teaCounts['කිරි තේ']?teaCounts['කිරි තේ']:0,
      'කිරි කෝපී':teaCounts['කිරි කෝපී']?teaCounts['කිරි කෝපී']:0,
      'කෝපී':teaCounts['කෝපී']?teaCounts['කෝපී']:0,
    }

    console.log('-teaCounts',teaCounts)
  
    return { orders, teaCounts };
  },
  

  getShopOrders: async (userId) => {

    console.log('getShopOrders---------------')

    // Group orders by item name and sum their quantities for a specific user
    return await Order.aggregate([
      {
        $match: { orderedBy: userId } // Match orders placed by the current user
      },
      {
        $group: {
          _id: "$name", // Group by item name
          totalQuantity: { $sum: "$quantity" } // Sum the quantity for each item
        }
      }
    ]);
  },

  updateOrder: async (id, orderData) => {
    // Find the order by ID and update it with new data
    const updatedOrder = await Order.findByIdAndUpdate(id, orderData, { new: true });
    
    // Emit a message to clients that the order has been accepted
    emitMessageToClients({ type: "new-order-reload", message: 'Order accepted' });

    return updatedOrder;
  },

  deleteOrder: async (id) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(id);

      // Emit a message to clients that the order has been deleted
      emitMessageToClients({ type: "new-order-reload", message: 'Order deleted' });

      return deletedOrder;
    } catch (error) {
      throw new Error('Error deleting order');
    }
  },
  
  cancelOrder: async (id) => {
    try {
      const deletedOrder = await Order.findOneAndUpdate({_id:new mongoose.Types.ObjectId(id)},{isCanceled:true})

      // Emit a message to clients that the order has been deleted
      emitMessageToClients({ type: "new-order-reload", message: 'Order deleted' });

      return deletedOrder;
    } catch (error) {
      throw new Error('Error deleting order');
    }
  },
};

module.exports = OrderService;
