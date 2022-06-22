import {
  Grid,
  Typography,
  Button,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
} from "@mui/material";
import "../components-styling/colours.css";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function Navigation() {
  const navigate = useNavigate();

  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon onClick={toggleDrawer} />
        </IconButton>
        <Drawer anchor="left" open={drawerState} onClose={toggleDrawer}>
          Haha
        </Drawer>
        <Typography variant="h6" color="inherit" component="div">
          A11yMaps
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
