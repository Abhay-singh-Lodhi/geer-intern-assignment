import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/product.js";
import ProductDetail from "./pages/productDetail.js"; // create this page
import AddProduct from "./pages/addProduct.js";
import Home from "./pages/home.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail/>} />
         <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
