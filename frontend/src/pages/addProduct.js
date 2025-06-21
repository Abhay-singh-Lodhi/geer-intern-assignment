
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function AddProduct() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
   const [category, setCategory] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${apiUrl}/products`, {
      name,
      price,
      image,
      category,
    });
    setSuccess(true);
    setTimeout(() => {
      navigate("/products");
    }, 1000); 

  } catch (err) {
    alert("Failed to add product.");
  }
};


  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, width: "100%", maxWidth: 500, borderRadius: 3 }}
      >
        <Typography variant="h5" gutterBottom>
          Add New Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Price"
            type="number"
            fullWidth
            required
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextField
            label="Image URL"
            fullWidth
            required
            margin="normal"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
            label="Category"
            fullWidth
            required
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ borderRadius: 2 }}
            >
              Add Product
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/products")}
              sx={{ borderRadius: 2 }}
            >
              ← Back
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Product added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
