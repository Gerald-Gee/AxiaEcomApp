// // routes/orderRoutes.js
// import { Router } from 'express';
// import {
//   createOrder,
//   getUserOrders,
//   getAllOrders,
//   updateOrderStatus,
//   deleteOrder
// } from '../controllers/orderApis/orderController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';
// import adminMiddleware from '../middlewares/adminMiddleware.js';

// const orderRouter = Router();

// // Create order (user)
// orderRouter.post('/order/create', authMiddleware, createOrder);

// // Get orders for logged-in user
// orderRouter.get('/orders', authMiddleware, getUserOrders);

// // Admin: get all orders
// orderRouter.get('/orders/all', authMiddleware, adminMiddleware, getAllOrders);

// // Admin: update order status
// orderRouter.put('/order/update/:id', authMiddleware, adminMiddleware, updateOrderStatus);

// // Admin: delete order
// orderRouter.delete('/order/delete/:id', authMiddleware, adminMiddleware, deleteOrder);

// export default orderRouter;
