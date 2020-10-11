import { Router } from 'express';

import { userSchemaValidator } from '../middleware/schemaValidator';

export const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the ALX Code Challenge Mini App Back-End REST API',
  });
});

indexRouter.post('/signup', userSchemaValidator, (req, res) => {
  res.status(200).json({
    message: 'You can proceed to the Controller',
  });
});
