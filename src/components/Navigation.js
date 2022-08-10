import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import "../components-styling/colours.css";
import { useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useSelector } from "react-redux";
import { logoutCurl } from "../async-functions/async";

export default function Navigation() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await logoutCurl();
      navigate("../");
    } catch (e) {
      console.error(e);
    }
  };
  const profileView = async () => {
    navigate("../profile");
  };

  const routePage = async () => {
    navigate("../search");
  };

  const loginRef = useSelector((state) => state.loginState);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          A11yMaps
        </Typography>

        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={profileView}>Profile</MenuItem>
          <MenuItem onClick={routePage}>Route Page</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
        {loginRef}
      </Toolbar>
    </AppBar>
  );
}
