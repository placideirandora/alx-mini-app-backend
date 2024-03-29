import express, { json } from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';

import { router } from './routes/index';
import { sequelize } from './data/models/index';
import swaggerDOC from '../swagger';

const app = express();

// Parse Body into a JSON Object
app.use(json());

// Fix the CORS issue from the Front-End
app.use(cors());

// Main Endpoint Route
app.use('/api/v1', router);

// Api Documentation Route
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDOC));

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

const port = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database Connected!');

  app.listen(port, () => {
    console.log(`App Listening on Port: ${port}`);
  });
});
