const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Order = require("./model/order");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/groceryDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.post("/api/orders", async (req, res) => {

    console.log("ORDER RECEIVED");
    console.log(req.body);

    try {

        const order = new Order(req.body);
        await order.save();

        res.json({
            success: true,
            message: "Order Saved"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            error: error.message
        });

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

app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});