import { Router } from 'express';

import { AuthController } from '../controllers/auth';
import { signUpSchemaValidator, signInSchemaValidator } from '../middleware/schemaValidator';

export const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the ALX Code Challenge Mini App Back-End REST API',
  });
});

indexRouter.post('/signup', signUpSchemaValidator, AuthController.signUp);

indexRouter.post('/signin', signInSchemaValidator, AuthController.signIn);


