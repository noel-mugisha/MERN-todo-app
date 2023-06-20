
const express= require('express');
const mongoose= require('mongoose');
const taskRoutes= require('./routes/taskRoutes');
const cors = require('cors');

const app= express();

// middleware
app.use(express.json());
app.use(cors());

// Database connection
const port = 8000;
const DB= 'mongodb://127.0.0.1:27017/to-do-app';
mongoose.connect(DB)
.then(() => {
    console.log('Database connected successfully!');
    app.listen(port, () => {
        console.log('App listening on port 8000...');
    });
})
.catch(err=>console.log(err));

//routes
app.use(taskRoutes);

