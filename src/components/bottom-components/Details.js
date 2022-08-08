import {
  Grid,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRoutes } from "../../actions/clearRoutes";
import { displayRoute } from "../../actions/displayRoute";
import {
  deleteAllSavedRoutes,
  getSavedRoutes,
} from "../../async-functions/async";

export default function Details(props) {
  const [currDisplayedPrevOrigin, setCurrDisplayedPrevOrigin] = useState("");
  const [currDisplayedPrevDest, setCurrDisplayedPrevDest] = useState("");
  const [dropdown, setDropdown] = useState([]);
  const [currDropdownVal, setCurrDropdownVal] = useState("");

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

  const handleDropdownChange = (event) => {
    setCurrDropdownVal(event.target.value);

    let newRoute = dropdown.filter(
      (route) => route.name == event.target.value
    )[0];
    setCurrDisplayedPrevOrigin(newRoute.origin);
    setCurrDisplayedPrevDest(newRoute.destination);
  };

  const clearSavedRoutes = async () => {
    await deleteAllSavedRoutes();
    dispatch(clearRoutes());
  };

  const viewSavedRoute = () => {
    dispatch(displayRoute([currDisplayedPrevOrigin, currDisplayedPrevDest]));
  };

  return (
    <Grid container space={1}>
      <Grid item xs={12}>
        <Typography variant={"h5"}>Saved Queries</Typography>
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="route-label">Route</InputLabel>
            <Select
              labelId="route-label"
              id="route"
              value={currDropdownVal}
              label="Route"
              onChange={handleDropdownChange}
              // input={<OutlinedInput label="Route" />}
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
        <Button variant="contained" type="submit" onClick={viewSavedRoute}>
          View Saved Route
        </Button>
      </Grid>
    </Grid>
  );
}
