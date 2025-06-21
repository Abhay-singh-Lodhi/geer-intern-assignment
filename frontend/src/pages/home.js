import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: "#1976d2" }}>
        Welcome to Geer Store 🛒
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: "text.secondary" }}>
        Click below to explore all available products.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ borderRadius: 3, px: 4 }}
        onClick={() => navigate("/products")}
      >
        View Products
      </Button>
    </Box>
  );
}
