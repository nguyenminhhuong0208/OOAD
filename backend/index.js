const port = 4000;
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { log } = require('console');

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
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    } //dấu backtick `` chứ không phải dấu nháy đơn ''
});

const upload = multer({storage: storage})

//creating upload endpoint for images

app.use('/images',express.static('upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}` //dấu backtick `` chứ không phải dấu nháy đơn ''
    })
});

//Schema for creating products
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        require: true,
    },
    name:{
        type:String,
        require: true,
    },
    image:{
        type: String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    new_price:{
        type:Number,
        require:true,
    },
    old_price:{
        type:Number,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avaiable:{
        type:Boolean,
        default:true,
    },

})

app.post('/addproduct', async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }else{
        id = 1;

    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Save");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//creating API for deleting products
app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
}) 

//creating API for getting all products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Tạo Schema cho mô hình user

const Users = mongoose.model("Users",{
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Creating Endpoint for regestering the user
app.post('/signup', async(req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if(check) {
        return res.status(400).json({success:false,errors:"existing user found with same email address"});
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id,
        },
    };
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token});
});

// Creating Endpoint for login the user
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id,
                },
            };
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else {
            res.json({success:false,errors:"Password is incorrect"});
        }
    } 
    else {
        res.json({success:false,errors:"User not found"});
    } 
});
app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " +port);
    }
    else {
        console.log("Error :"+error);
    }
});
