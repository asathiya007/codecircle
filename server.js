const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db");

const app = express(); 
app.use(express.json());
app.use(cors());
connectDB(); 

// @route   GET /
// @desc    test API running -- TESTING ONLY 
// @access  public 
// app.get('/', (req, res) => res.json({msg: 'API running'}));

// other routes
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
