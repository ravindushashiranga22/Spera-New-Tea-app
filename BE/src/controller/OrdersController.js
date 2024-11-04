const OrderService = require('../service/OrderService');

const OrderController = {
  createOrder: async (req, res) => {
    try {
      const order = await OrderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Error creating order', error });
    }
  },

  getOrders: async (req, res) => {
    try {
      const orders = await OrderService.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error });
    }
  },

  getOrdersById: async (req, res) => {
    try {
      const { id } = req.params;
      const orders = await OrderService.getOrdersById(id);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error });
    }
  },

  getShopOrders: async (req, res) => {

    console.log('getShopOrders--------------------------------')

    try {


      console.log('getShopOrders--------------------------------')

      const userRole = req.user.role;

      // Check if the user role is "Shop"
      if (userRole === "Shop") {
        // Fetch grouped shop orders via the OrderService
        const orders = await OrderService.getShopOrders(req.user._id);
        return res.status(200).json({ orders });
      } else {
        return res.status(403).json({ message: "Only Shop users can view order counts." });
      }
    } catch (error) {
      console.error("Error fetching shop orders:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateOrder: async (req, res) => {
    const { id } = req.params;
    const orderData = req.body;

    try {
      const updatedOrder = await OrderService.updateOrder(id, orderData);
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: 'Error updating order', error });
    }
  },

  cancelOrder: async (req, res) => {
    const { id } = req.params;
    const { isCanceled, cancelReason, isCanceledByUser, predefinedReasons  } = req.body; 

    try {
      const updatedOrder = await OrderService.findByIdAndUpdate(id,
        { isCanceled: isCanceled, cancelReason: cancelReason, isCanceledByUser: isCanceledByUser, predefinedReasons: predefinedReasons},
        { new: true }
      );
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error("Error canceling order:", error);
      res.status(500).json({ message: 'Error canceling order', error });
  }
},
};
  

module.exports = OrderController;
2002