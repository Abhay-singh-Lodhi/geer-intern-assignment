import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Autocomplete,
  InputBase,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  maxWidth: 400,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    marginTop: theme.spacing(1),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "absolute",
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  paddingLeft: `calc(1em + ${theme.spacing(5)})`,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

export default function Navbar({ onSearch, products }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);

  // Unique category suggestions
  React.useEffect(() => {
    if (!products || products.length === 0) return;
    const categories = [...new Set(products.map((p) => p.category?.toLowerCase()))].filter(Boolean);
    setOptions(categories);
  }, [products]);

  const handleInputChange = (e, newInputValue) => {
    setInputValue(newInputValue);
    onSearch(newInputValue, "category");
  };

  const handleChange = (e, newValue) => {
    setInputValue(newValue || "");
    onSearch(newValue || "", "category");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar
        sx={{
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          justifyContent: "space-between",
          gap: isMobile ? 1 : 0,
          p: isMobile ? 1 : 2,
        }}
      >
        {/* LEFT: Title */}
        {!isMobile && (
          <Typography variant="h6" sx={{ flexShrink: 0 }}>
            Welcome to Geer
          </Typography>
        )}

        {/* CENTER: Styled Autocomplete Search */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete
              freeSolo
              options={options}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              onChange={handleChange}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <StyledInputBase
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  placeholder="Search by category..."
                />
              )}
            />
          </Search>
        </Box>

        {/* RIGHT: Login Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LoginIcon />}
            sx={{ textTransform: "none", borderRadius: 2 }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
