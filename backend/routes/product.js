const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// 1. GET /api/products – List all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 2 -a. POST /api/products – Add a new product
router.post("/", async (req, res) => {
  const { name, price, image ,category} = req.body;
  try {
    const newProduct = new Product({ name, price, image,category });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error adding product" });
  }
});

//  2-b. POST /api/products - add multiple products 
// router.post("/", async (req, res) => {
//   const products = req.body; // expecting an array of product objects

//   if (!Array.isArray(products) || products.length === 0) {
//     return res.status(400).json({ error: "Request must be a non-empty array" });
//   }

//   try {
//     await Product.insertMany(products);
//     res.status(201).json({ message: "Products added successfully" });
//   } catch (err) {
//     console.error("Insert error:", err);
//     res.status(400).json({ error: "Error adding products" });
//   }
// });

router.get("/:id",async(req,res)=>{
   const {id} = req.params;
   try{
    let product = await Product.findById(id);
    res.json(product);
   }catch(e){
    console.log("error fetching product details");
   }
})

// 3. DELETE /api/products/:id – Delete product by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting product" });
  }
});

module.exports = router;
