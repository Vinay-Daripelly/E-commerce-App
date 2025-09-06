const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
// const path = require('path'); 

dotenv.config(); 
connectDB();
const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes); 
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

// 2Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set the static folder
//   app.use(express.static(path.join(__dirname, '../modern-shop-frontend/dist')));

//   // Serve the index.html file for all other routes
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../modern-shop-frontend', 'dist', 'index.html'));
//   });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});