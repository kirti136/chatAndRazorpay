require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const { connectDB } = require("./config/db.js");
const path = require("path");
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/success.html"));
});

app.post("/createOrder", (req, res) => {
  const { amount, currency, receipt, notes } = req.body;
  razorpayInstance.orders.create(
    { amount, currency, receipt, notes },
    (err, order) => {
      if (!err) {
        console.log(order.id);
        res.json(order);
      } else {
        res.send(err);
      }
    }
  );
});

app.post("/verifyOrder", (req, res) => {
  const { order_id, payment_id } = req.body;
  const razorpay_signature = req.headers["x-razorpay-signature"];

  // const razorpay_signature = "c8a32dc7fde5a3652846e7613e975b8c5c71d7c5e55e29d3007cad7e4b99a2db";

  let hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  hmac.update(order_id + "|" + payment_id);
  const generated_signature = hmac.digest("hex");
  if (razorpay_signature === generated_signature) {
    res.json({ success: true, message: "Payment has been verified" });
  } else {
    res.json({ success: false, message: "Payment verification failed" });
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
