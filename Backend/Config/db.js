const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);
// mongoose.connect('mongodb://localhost:27017/employee');