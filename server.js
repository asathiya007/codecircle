const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const tokenauth = require('./middleware/tokenauth');
const File = require('./models/File');
const fileUpload = require('express-fileupload');

const app = express(); 
app.use(express.json());
app.use(cors());
app.use(fileUpload());
connectDB(); 

// @route   GET /
// @desc    test API running -- TESTING ONLY 
// @access  public 
// app.get('/', (req, res) => res.json({msg: 'API running'}));

// @route   POST /uploads
// @desc    file upload 
// @access  private
app.post('/uploads', tokenauth, async(req, res) => {
    // create a new File object and send its id to the client
    const file = new File({
        user: req.user.id, 
        ...req.files.file
    }); 
    await file.save(); 
    res.json(file.id);
}); 

// other routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth')); 
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
