import { Router } from 'express';

const allApis = Router();

const apis = [
  {
    name: 'user',
    description: 'User related APIs',
    endpoints: [
      'http://localhost:3000/api/user/create',
      'http://localhost:3000/api/user/login',
      'http://localhost:3000/api/user/verifyOTP',
      'http://localhost:3000/api/user/resendOTP',
      'http://localhost:3000/api/user/update/:id',
      'http://localhost:3000/api/user/delete/:id'
    ]
  },
  {
    name: 'product',
    description: 'Product related APIs',
    endpoints: [
      'http://localhost:3000/api/product/create',
      'http://localhost:3000/api/products',
      'http://localhost:3000/api/product/update/:id',
      'http://localhost:3000/api/product/delete/:id'
    ]
  },
  {
    name: 'cart',
    description: 'Cart related APIs',
    endpoints: [
      'http://localhost:3000/api/cart/create/:productId',
      'http://localhost:3000/api/carts',
      'http://localhost:3000/api/cart/update',
      'http://localhost:3000/api/cart/items/delete'
    ]
  },
  {
    name: 'order',
    description: 'Order related APIs',
    endpoints: [
      'http://localhost:3000/api/order/create',
      'http://localhost:3000/api/orders',
      'http://localhost:3000/api/order/update/:id',
      'http://localhost:3000/api/order/delete/:id'
    ]
  },
  {
    name: 'fileUpload',
    description: 'File upload APIs',
    endpoints: [
      'http://localhost:3000/api/uploadFile'
    ]
  },
  {
    name: 'otp',
    description: 'OTP related APIs',
    endpoints: [
      'http://localhost:3000/api/otp/verify',
      'http://localhost:3000/api/otp/resend'
    ]
  }
];

allApis.get('/', (req, res) => res.status(200).send(apis));

export default allApis;
