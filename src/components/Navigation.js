import {
  Grid,
  Typography,
  Button,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import "../components-styling/colours.css";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Photos
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
