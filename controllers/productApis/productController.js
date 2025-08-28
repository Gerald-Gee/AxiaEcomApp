import Product from '../../schemas/productSchema.js';

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  const { name, price, color, size, category, imgUrl } = req.body;
  const user = req.user;

  if (!name || !price || !color || !size || !category || !imgUrl

  ) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const newProduct = new Product({
      ...req.body,
      userId: user._id
    });
    await newProduct.save();
    res.status(201).json({ message: 'New Product created successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET PRODUCTS BY QUERY PARAMS
export const getByqueryParams = async (req, res) => {
  const { name, category, color, price } = req.query;
  const filter = {};

  if (name) filter.name = new RegExp(name, 'i');
  if (category) filter.category = category;
  if (price) filter.price = price;
  if (color) filter.color = color;

  try {
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

// EDIT PRODUCT
export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, color, size, category, imgUrl } = req.body;
  const reqId = req.user._id;

  try {
    const product = await Product.findOne({ _id: id, userId: reqId });
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.color = color ?? product.color;
    product.size = size ?? product.size;
    product.category = category ?? product.category;
    product.imgUrl = imgUrl ?? product.imgUrl;

    await product.save();
    res.status(200).json({ message: 'Product updated successfully' });

  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};
