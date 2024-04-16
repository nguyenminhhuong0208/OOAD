const port = 4000;
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Database connection with mongoDB
mongoose.connect("mongodb+srv://22022590:hoan2004@cluster0.mpnbem8.mongodb.net/e-commerce",);

// API creation
app.get("/",(req,res)=>{
    res.send("Express App is running")
});
// image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null,'${file.fieldname}_${Date.now()}${path.extname(file.originalname)}')
    }
});

const upload = multer({
    storage: storage
})

//creating upload endpoint for images
app.use('/images',express.static('upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url:'http://localhost:${port}/images/${req.file.filename}'
    })
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port" +port);
    }
    else {
        console.log("Error :"+error);
    }
});