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
  Button,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRoutes } from "../../actions/clearRoutes";
import {
  deleteAllSavedRoutes,
  getSavedRoutes,
} from "../../async-functions/async";

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

  const dispatch = useDispatch();

  const savedRoutes = useSelector((state) => state.savedRoutesReducer);

  useEffect(() => {
    async function loadSavedRoutes() {
      const storedSavedRoutes = await getSavedRoutes();
      setDropdown(storedSavedRoutes);
    }
    loadSavedRoutes();
  }, [savedRoutes]);

  const handleDropdownChange = () => {};

  const clearSavedRoutes = async () => {
    await deleteAllSavedRoutes();
    dispatch(clearRoutes());
  };

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
                <MenuItem key={route.name} value={route.name}>
                  {route.name}
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
      <Grid>
        <Button variant="contained" type="submit" onClick={clearSavedRoutes}>
          Clear Saved Routes
        </Button>
      </Grid>
    </Grid>
  );
}
