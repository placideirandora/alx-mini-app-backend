import { Router } from 'express';

export const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res
    .status(200)
    .json({
      message: 'Welcome to the ALX Code Challenge Mini App Back-End REST API',
    });
});
