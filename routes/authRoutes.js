import Router from 'express';
import {
  loggingIn,
  passwordResetRequest,
  passwordReset
} from '../controllers/authApis/authControllers.js';

const authRouter = Router();

// Auth routes
authRouter
  .post('/user/login', loggingIn)
  .post('/password/resetRequest', passwordResetRequest)
  .post('/password/reset', passwordReset);

export default authRouter;
