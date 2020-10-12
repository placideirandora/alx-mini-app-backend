import { Router } from 'express';

import { UserController } from '../controllers/user';
import { userSchemaValidator } from '../middleware/schemaValidator';

export const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the ALX Code Challenge Mini App Back-End REST API',
  });
});

indexRouter.post('/signup', userSchemaValidator, UserController.signUp);
