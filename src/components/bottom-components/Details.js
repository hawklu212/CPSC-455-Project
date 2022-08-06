import {
  Box,
  Grid,
  Slider,
  TextField,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";

import { useState } from "react";
import { useSelector } from "react-redux";

export default function Details(props) {
  const [currDisplayedPrevOrigin, setCurrDisplayedPrevOrigin] = useState("");
  const [currDisplayedPrevDest, setCurrDisplayedPrevDest] = useState("");
  const [dropdown, setDropdown] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const savedRoutes = useSelector((state) => state.savedRoutesReducer);

  const handleDropdownChange = () => {};

  return (
    <Grid container space={1}>
      <Grid item xs={12}>
        <Typography variant={"h5"}>Saved Queries</Typography>
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Route</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={dropdown}
              onChange={handleDropdownChange}
              input={<OutlinedInput label="Route" />}
              MenuProps={MenuProps}
            >
              {dropdown.map((route) => (
                <MenuItem key={route} value={route}>
                  {route}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Grid>
      <Grid item xs={6}>
        <Typography variant={"h6"}>Origin</Typography>
      </Grid>
      <Grid item xs={6}>
        <Chip label={currDisplayedPrevOrigin}></Chip>
      </Grid>
      <Grid item xs={6}>
        <Typography variant={"h6"}>Destination</Typography>
      </Grid>
      <Grid item xs={6}>
        <Chip label={currDisplayedPrevDest}></Chip>
      </Grid>
    </Grid>
  );
}
