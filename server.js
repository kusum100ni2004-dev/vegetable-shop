require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Order = require("./model/order");
const Product = require("./model/product");   // NAYA

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));   // image base64 ke liye limit badhayi
app.use(express.static("public"));

<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
=======
require("dotenv").config();
mongoose.connect("process.env.MONGO_URI")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
>>>>>>> 7b87761 (some change for deploy)

// ---------------- ORDERS ----------------

app.post("/api/orders", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.json({ success: true, message: "Order Saved" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get("/api/orders", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
});

<<<<<<< HEAD
app.listen(process.env.PORT || 5000, () => {
    console.log("Server Running On Port 5000");
});
=======
// ---------------- PRODUCTS (NAYA) ----------------

app.post("/api/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.delete("/api/products/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Product Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Running On Port 5000");
});

























// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const Order = require("./model/order");

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));

// mongoose.connect("mongodb://127.0.0.1:27017/groceryDB")
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// app.post("/api/orders", async (req, res) => {

//     console.log("ORDER RECEIVED");
//     console.log(req.body);

//     try {

//         const order = new Order(req.body);
//         await order.save();

//         res.json({
//             success: true,
//             message: "Order Saved"
//         });

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             success: false,
//             error: error.message
//         });

//     }
// });

// app.get("/api/orders", async (req, res) => {

//     try {
//         const orders = await Order.find().sort({ createdAt: -1 });
//         res.json(orders);
//     } catch (error) {
//         res.status(500).json(error);
//     }

// });

// app.listen(5000, () => {
//     console.log("Server Running On Port 5000");
// });
>>>>>>> 7b87761 (some change for deploy)
