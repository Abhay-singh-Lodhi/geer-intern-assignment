
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Button,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";

export default function ProductDetail() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios.get(`${apiUrl}/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/products/${id}`);
      setDeleted(true);
      setTimeout(() => navigate("/products"), 1500);
    } catch (error) {
      alert("Failed to delete product.");
    }
  };

  if (!product) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={6}
        sx={{
          p: 3,
          maxWidth: 700,
          width: "100%",
          borderRadius: 4,
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* 🔙 Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/products")}
            sx={{ borderRadius: 2 }}
          >
            ← Back to Products
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{ borderRadius: 2 }}
            onClick={() => setConfirmOpen(true)}
          >
            Delete Product
          </Button>
        </Box>

        {/* Product Card */}
        <Card sx={{ boxShadow: 0 }}>
          <CardMedia
            component="img"
            height="300"
            image={product.image}
            alt={product.name}
            sx={{
              objectFit: "cover",
              borderRadius: 2,
              mb: 2,
            }}
          />
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              {product.name}
            </Typography>

            <Chip
              label={`₹${product.price.toLocaleString("en-IN")}`}
              color="success"
              variant="filled"
              sx={{ fontSize: "1rem", px: 2, py: 1, mb: 2 }}
            />

            <Typography variant="body2" color="text.secondary">
              Product ID: {product._id}
            </Typography>
          </CardContent>
        </Card>
      </Paper>

      {/* Delete Confirm Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={deleted}
        autoHideDuration={3000}
        onClose={() => setDeleted(false)}
      >
        <Alert severity="success" onClose={() => setDeleted(false)}>
          Product deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
