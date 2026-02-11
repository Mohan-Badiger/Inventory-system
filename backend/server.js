import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import storePrRoutes from './routes/storepr.routes.js';
import storeGrnRoutes from './routes/storegrn.routes.js';

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// MongoDB connection
connectDB();

// server start
const PORT = process.env.PORT || 5000;

// test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/storepr', storePrRoutes);
app.use('/api/storegrn', storeGrnRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
