const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');

//To generate JWT webtoken
// const crypto = require('crypto');

// const secret = crypto.randomBytes(64).toString('hex');
// console.log(secret," +++++++ ");



const app = express();
connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

