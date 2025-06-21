
import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";



import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.js";

export default function Products() {
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(apiUrl);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${apiUrl}/products`).then((res) => {
      setProducts(res.data);
      setFiltered(res.data);
    });
  }, []);

const handleSearch = (query) => {
  const filteredList = products.filter((item) =>
    (item.category || "").toLowerCase().includes(query.toLowerCase())
  );
  setFiltered(filteredList);
};



  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Navbar onSearch={handleSearch} products={products}/>
      <Box sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>
     <Typography
  variant="h4"
  align="center"
  gutterBottom
  sx={{
    fontWeight: 700,
    mb: 4,
    fontSize: { xs: "1.8rem", sm: "2.4rem" },
    color: "primary.main",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
    letterSpacing: 1,
  }}
>
  🛍️ Explore Our Products
</Typography>


        <Grid container spacing={3} justifyContent="center">
          {filtered.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
  <Card
    sx={{
      width: 280,
      height: 360,
      mx: "auto",
      borderRadius: 3,
      boxShadow: 3,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "scale(1.03)",
        boxShadow: 6,
      },
      cursor: "pointer",
    }}
    onClick={() => navigate(`/products/${product._id}`)}
  >
    <CardMedia
      component="img"
      image={product.image}
      alt={product.name}
      sx={{
        height: 180,
        objectFit: "cover",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
    />
    <CardContent
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {product.name}
      </Typography>
      <Chip
        label={`₹${product.price}`}
        color="success"
        sx={{ mt: 1 }}
      />
    </CardContent>
  </Card>
</Grid>

          ))}
        </Grid>
        <Fab
  color="primary"
  aria-label="add"
  sx={{ position: "fixed", bottom: 24, right: 24 }}
  onClick={() => navigate("/add-product")}
>
  <AddIcon />
</Fab>
      </Box>
    </Box>
  );
}
