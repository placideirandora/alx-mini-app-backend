import { Router } from 'express';

import { AuthController } from '../controllers/auth';
import {
  signUpSchemaValidator,
  signInSchemaValidator,
  changePasswordSchemaValidator,
} from '../middleware/schemaValidator';
import {
  TokenVerification,
} from '../middleware/tokenVerifier';

export const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the ALX Code Challenge Mini App Back-End REST API',
  });
});

indexRouter.post('/auth/signup', signUpSchemaValidator, AuthController.signUp);

indexRouter.post(
  '/auth/signin',
  signInSchemaValidator,
  AuthController.signIn
);

indexRouter.post(
  '/auth/change-password',
  TokenVerification.verifyToken,
  changePasswordSchemaValidator,
  AuthController.changePassword
);
