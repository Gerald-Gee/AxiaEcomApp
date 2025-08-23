import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getByqueryParams,
  editProduct,
  deleteProduct
} from '../controllers/productApis/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const productRouter = Router();

productRouter
  // Create product
  .post('/product/create', authMiddleware, createProduct)
  // Get products
  .get('/products', getAllProducts)
  .get('/productsByquery', getByqueryParams)
  // Update product
  .put('/product/update/:id', authMiddleware, editProduct)
  // Delete product
  .delete('/product/delete/:id', authMiddleware, deleteProduct);

export default productRouter;
