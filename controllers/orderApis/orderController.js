import Order from '../../schemas/orderSchema.js';
import Cart from '../../schemas/cartSchema.js';
import Product from '../../schemas/productSchema.js';

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = new Order({
      userId,
      products: cart.products,
      totalPrice: cart.totalCartPrice,
      status: 'Pending'
    });

    await order.save();

    // Reduce product stock (if stock tracking is implemented)
    for (let item of cart.products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }

    // Clear cart after ordering
    cart.products = [];
    cart.totalCartPrice = 0;
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL ORDERS (Admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'username email');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET USER'S ORDERS
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE ORDER STATUS (Admin only)
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteOrder = async (req, res) =>{
    res.send("order deleted")
}
