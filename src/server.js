import express, { json } from 'express';

const app = express();

// Parse Body into a JSON Object
app.use(json());

app.use((req, res) => {
  res.status(404).json({ status: 404, error: 'Route not found' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App Listening on Port: ${port}`);
});
