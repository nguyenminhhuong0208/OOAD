const port = 4000;
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { log } = require('console');
const axios = require('axios'); // Import axios



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
    // bổ sung thêp average rating và number of rating
    aver_rating:{
        type:Number,
        require:true,
    },
    num_ratings:{
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
        // bổ sung thêp average rating và number of rating
        aver_rating:req.body.aver_rating,
        num_ratings:req.body.num_ratings,
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

app.get('/getproductbyname', async(req, res)=> {
    let product = await Product.findOne({name: req.query.name})
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Get product by name successful.", data: product });
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
                    name: user.name // Thêm tên người dùng vào dữ liệu của token
                },
            };
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token ,name: data.user.name});
        }
        else {
            res.json({success:false,errors:"Password is incorrect"});
        }
    } 
    else {
        res.json({success:false,errors:"User not found"});
    } 
});
// Thêm endpoint để lấy thông tin người dùng từ cơ sở dữ liệu
app.get('/user', async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, errors: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ success: false, errors: "Internal server error" });
    }
});


//creating endpoint for newcollection data
app.get('/newcollections',async (req,res)=>{
    let products = await Product.find({}); // truy vấn bảng Product trong DB
    let newcollection = products.slice(1).slice(-4); //lấy 8 sản phẩm mới nhất từ danh sách
    console.log("NewCollection Fetched"); //thông báo lấy dữ liệu thành công
    res.send(newcollection);
})

//creating endpoint for popular in women section
app.get('/popularinwomen', async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

//creat middelware to fetch user
const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"please authenticate using a valid token"})
        }
    }
}

//creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

//creating endpoint to remove product form cartdata
app.post('/removefromcart', fetchUser, async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

//creating endpoint to get cartdata
app.post('/getcart', fetchUser, async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

// Creating endpoint for recommendations
app.get('/recommend', async (req, res) => {
    const { item_name, user_id } = req.query;
    try {
        const response = await axios.get(`http://localhost:4040/recommend/`, {
            params: { item_name, user_id }
        });
        const recommendedItemIds = response.data.recommendations;

        // Lấy thông tin chi tiết về sản phẩm dựa trên các ID được khuyến nghị
        const recommendedItems = await Product.find({ name: { $in: recommendedItemIds } });

        res.json(recommendedItems);
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).send("Error fetching recommendations");
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
