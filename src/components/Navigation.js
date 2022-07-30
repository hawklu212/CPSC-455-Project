import {
  Grid,
  Typography,
  Button,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  MenuItem,
  Menu,
} from "@mui/material";
import "../components-styling/colours.css";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawerState, loginState } from "../actions";
import { logoutCurl } from "../async-functions/async";


export default function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginState);
  const logout = async () => {
    try {
      await logoutCurl();
      dispatch(loginState(""));
      navigate("../");
    } catch (e) {
      console.error(e);
    }
  };
  const profileView = async () =>{
    dispatch(loginState(""));
    navigate("../profile");
  };

  const drawerState = useSelector((state) => state.drawerState);
  // const [drawerState, setDrawerState] = useState(false);
  const loginRef = useSelector((state) => state.loginState);
  const toggleDrawer = () => {
    // setDrawerState(!drawerState);
    dispatch(toggleDrawerState(drawerState));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {["Maps", "Saved Routes"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <LocationSearchingIcon />
                ) : (
                  <SavedSearchIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={drawerState} onClose={toggleDrawer}>
          {list()}
        </Drawer>
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
          <MenuItem onClick={handleClose}>My Account</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
        {loginRef}
      </Toolbar>
    </AppBar>
  );
}
