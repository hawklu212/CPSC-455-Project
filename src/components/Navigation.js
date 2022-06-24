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
} from "@mui/material";
import "../components-styling/colours.css";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
//import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { toggleDrawerState } from "../actions";

export default function Navigation() {
  const navigate = useNavigate();
  const drawerState=useSelector(state=>state.drawerState);
  //const [drawerState, setDrawerState] = useState(false);
  const dispatch=useDispatch();
  const toggleDrawer = () => {
    //setDrawerState(!drawerState);
    dispatch(toggleDrawerState(drawerState));
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
    <AppBar position="static">
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
        <Typography variant="h6" color="inherit" component="div">
          A11yMaps
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
