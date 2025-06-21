require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.js");
const productRoute = require("./routes/product.js");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/products", productRoute);

const PORT = process.env.PORT;


app.listen(PORT, () => {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("db connected");
  });
  console.log(`listening on port ${PORT}`);
});


