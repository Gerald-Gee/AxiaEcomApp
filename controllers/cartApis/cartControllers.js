import Product from '../../schemas/productSchema.js';
import Cart from '../../schemas/cartSchema.js';

// CREATE CART ITEM
export const createCartItem = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(400).json({ message: "Product not found" });

    // Check if user has a cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        products: [{
          productId: product._id,
          quantity: 1,
          price: product.price
        }]
      });
    } else {
      const existingCartItem = cart.products.find(item => item.productId.toString() === productId);
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        cart.products.push({
          productId: product._id,
          quantity: 1,
          price: product.price
        });
      }
    }

    // Update prices
    cart.products.forEach(item => {
      item.totalItemPrice = item.price * item.quantity;
    });
    cart.totalCartPrice = cart.products.reduce((sum, item) => sum + item.totalItemPrice, 0);

    await cart.save();
    await cart.populate('products.productId');

    res.status(201).json(cart);

  } catch (error) {
    res.status(500).json(error);
  }
};

// EDIT CART ITEM
export const editCartItem = async (req, res) => {
  const { productId, type } = req.body; // type can be "increase" or "decrease"
  const userId = req.user._id;

  if (!productId || !type) return res.status(400).json({ message: "Please provide all fields" });

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(400).json({ message: "Cart not found" });

    const existingCartItem = cart.products.find(item => item.productId.toString() === productId);
    if (!existingCartItem) return res.status(400).json({ message: "Product not found in cart" });

    if (type === "increase") {
      existingCartItem.quantity += 1;
    } else if (type === "decrease" && existingCartItem.quantity > 1) {
      existingCartItem.quantity -= 1;
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }

    cart.products.forEach(item => {
      item.totalItemPrice = item.price * item.quantity;
    });
    cart.totalCartPrice = cart.products.reduce((sum, item) => sum + item.totalItemPrice, 0);

    await cart.save();
    await cart.populate('products.productId');

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json(error);
  }
};

// GET CART ITEMS
export const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');
    if (!cart) return res.status(400).json({ message: "Cart not found" });

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE CART ITEMS
export const deleteCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(400).json({ message: "Cart not found" });

    cart.products = [];
    cart.totalCartPrice = 0;
    await cart.save();

    res.status(200).json({ message: 'Cart deleted successfully' });

  } catch (error) {
    res.status(500).json(error);
  }
};
