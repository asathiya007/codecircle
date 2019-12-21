const express = require('express');
const cors = require('cors');

const app = express(); 
app.use(express.json());
app.use(cors());

// @route   GET /
// @desc    test API running 
// @access  public 
app.get('/', (req, res) => res.json({msg: 'API running'}));

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
