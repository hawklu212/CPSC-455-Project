import Evaluation from "./Evaluation";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import {
  Box,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StraightenIcon from "@mui/icons-material/Straighten";
import TimerIcon from "@mui/icons-material/Timer";
import FlagIcon from "@mui/icons-material/Flag";
import { green, red, yellow } from "@mui/material/colors";
import CallMadeIcon from "@mui/icons-material/CallMade";
import HeightIcon from "@mui/icons-material/Height";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { changeRouteIndex } from "../../actions/changeRouteIndex";

export default function RightBottomContainer() {
  const directions = useSelector((state) => state.directionsReducer);
  const dispatch = useDispatch();

  const iconDimension = 30;
  const ratingIconDimension = 45;

  const changeDisplayedRoute = (newIndex) => {
    dispatch(changeRouteIndex(newIndex));
  };

  const goodRating = (
    <Box sx={{ display: "flex", flexDirection: "column", bgcolor: green[50] }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <IconButton aria-label="play/pause">
          <SentimentVerySatisfiedIcon
            sx={{ height: ratingIconDimension, width: ratingIconDimension }}
          />
        </IconButton>
      </CardContent>
    </Box>
  );
  const neutralRating = (
    <Box sx={{ display: "flex", flexDirection: "column", bgcolor: yellow[50] }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <IconButton aria-label="play/pause">
          <SentimentNeutralIcon
            sx={{ height: ratingIconDimension, width: ratingIconDimension }}
          />
        </IconButton>
      </CardContent>
    </Box>
  );
  const badRating = (
    <Box sx={{ display: "flex", flexDirection: "column", bgcolor: red[50] }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <IconButton aria-label="play/pause">
          <SentimentVeryDissatisfiedIcon
            sx={{ height: ratingIconDimension, width: ratingIconDimension }}
          />
        </IconButton>
      </CardContent>
    </Box>
  );

  const ratingArray = [goodRating, neutralRating, badRating];

  return (
    <div className={"results"}>
      {directions.map((direction) => (
        // TODO: add unique ID here?
        <Card
          className={"routeResult"}
          variant={"outlined"}
          sx={{ display: "flex", m: 1 }}
          key={direction.distance}
          onClick={() => changeDisplayedRoute(direction.routeIndex)}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="">
                <IconButton aria-label="elevation">
                  <HeightIcon
                    sx={{ height: iconDimension, width: iconDimension }}
                  />
                </IconButton>
                Total elevation: {(direction.distance * 1.5).toFixed(0)} meters
              </Typography>
              <Typography component="div" variant="">
                <IconButton aria-label="distance">
                  <StraightenIcon
                    sx={{ height: iconDimension, width: iconDimension }}
                  />
                </IconButton>
                Distance: {direction.distance} kilometers
              </Typography>
              <Typography component="div" variant="">
                <IconButton aria-label="duration">
                  <TimerIcon
                    sx={{ height: iconDimension, width: iconDimension }}
                  />
                </IconButton>
                Duration: {direction.duration} minutes
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="">
                <IconButton aria-label="max-incline">
                  <CallMadeIcon
                    sx={{ height: iconDimension, width: iconDimension }}
                  />
                </IconButton>
                Maximum incline: {(Math.random() * 15).toFixed(0)} degrees
              </Typography>
              <Typography component="div" variant="">
                <IconButton aria-label="start" style={{ color: green[500] }}>
                  <FlagIcon
                    sx={{ height: iconDimension, width: iconDimension }}
                  />
                </IconButton>
                Start Location: {direction.startAddress}
              </Typography>
              <Typography component="div" variant="">
                <IconButton aria-label="end" style={{ color: red[500] }}>
                  <FlagIcon
                    sx={{ height: iconDimension, width: iconDimension }}
                  />
                </IconButton>
                End Location: {direction.endAddress}
              </Typography>
            </CardContent>
          </Box>
          <Divider orientation="vertical" flexItem />
          {ratingArray[Math.floor(Math.random() * (2 + 1))]}
        </Card>
      ))}
    </div>
  );

  return (
    <span id="RIGHT_BOTTOM" style={{ display: "inline-block" }}>
      <Evaluation />
    </span>
  );
}
