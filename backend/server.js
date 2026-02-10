import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

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

// routes
// import prRoutes from './routes/pr.routes.js';
// import poRoutes from './routes/po.routes.js';
// import grnRoutes from './routes/grn.routes.js';

// app.use('/api/pr', prRoutes);
// app.use('/api/po', poRoutes);
// app.use('/api/grn', grnRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
