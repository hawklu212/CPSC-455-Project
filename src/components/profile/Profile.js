import {
  Grid,
  Typography,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import "../../components-styling/colours.css";
import { Slider, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useEffect, useState } from "react";
import { getUserPreferenceCurl, loginCurl, putSetUserPreferenceCurl } from "../../async-functions/async";
import { loginState } from "../../actions";
import { setInitialCookieCurl, getCookieValidationCurl } from "../../async-functions/async";
import { validate } from "email-validator";
import { textAlign, width } from "@mui/system";

const marks = [
  {
    value: 1,
    label: "1°",
  },
  {
    value: 2,
    label: "2°",
  },
  {
    value: 3,
    label: "3°",
  },
  {
    value: 4,
    label: "4°",
  },
  {
    value: 5,
    label: "5°",
  },
];


export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginState);
  const [incline, setIncline] = useState(4);
  const [weight, setWeight] = useState(0);
  const [priority, setPriority] = useState("distance");
  const [helperText, setHelperText] = useState("");
  const [saveText, setSaveText] = useState("");
  const [currPrefText, setcurrPrefText] = useState("");
  const handleInclineChange = (event) => {
    setIncline(event.target.value);
  };
  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
    console.log(event.target.value);
    switch (event.target.value) {
      case "distance":
        setHelperText("I value shorter distances more.");
        break;
      case "gradient":
        setHelperText("I value shallower inclines more.");
        break;
      default:
        setHelperText("Distance and incline are equally important to me.");
    }
  };
  const currentPreferences =async () => {
    try{
      const userPref= await getUserPreferenceCurl();
      if (userPref["exists"]==1){
      setcurrPrefText(`maxIncline:${userPref["maxIncline"]}, weight:${userPref["weight"]}, distancePreference:${userPref["distancePreference"]} `)
      }
      else{
        setcurrPrefText("User preferences not set");
      }
    }
      catch (error){
        console.log(error);
      }
  };

  const handleSave =async () => {
    // create preferences object
    const profile = {
      // email: loginUser? Not sure about this, @Hawk you might know more
      maxIncline: incline,
      weight: weight,
      distancePreference: priority
    };
    try{
    await putSetUserPreferenceCurl(profile);
    setSaveText("Save Successful");
    }
    catch (error){
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginUser !== "") {
      setInitialCookieCurl({ userName: loginUser })
        .then((res) => {
          if (res["status"] !== 0) {
            navigate("../");
          } else {
            dispatch(loginState(res["userName"]));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getCookieValidationCurl()
        .then((res) => {
          if (res.status !== 200) {
            navigate("../");
            return;
          } else {
            res
              .json()
              .then((ret) => {
                console.log(ret);
                dispatch(loginState(ret["userName"]));
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return loginUser !== "" ? (
    <>
      <Navigation />
      <Grid
        className="yellow-2"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Typography variant="h2">Profile</Typography>
        <Divider style={{ width: "50%" }}></Divider>
        <br />
        <br />

        <br />
        <br />
        <Grid item xs={6}>
          <Typography variant={"h6"}>Maximum Allowable Incline</Typography>
        </Grid>
        <br />
        <Slider
          style={{ width: "25%" }}
          aria-label={"Max incline"}
          defaultValue={4}
          step={1}
          marks={marks}
          min={1}
          max={5}
          onChange={handleInclineChange}
        />

        <br />
        <br />
        <TextField
          // error={}
          // helperText={}
          variant="outlined"
          required
          defaultValue={4}
          label="Weight (in kg)"
          type="number"
          onChange={handleWeightChange}
        ></TextField>
        <br />
        <Typography variant={"h6"}>
          Is Distance or Incline more important to you?
        </Typography>
        <br />

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            id="select-helper"
            value={priority}
            style={{ textAlign: "center" }}
            onChange={handlePriorityChange}
          >
            <MenuItem value="distance">Distance</MenuItem>
            <MenuItem value="gradient">Gradient</MenuItem>
            <MenuItem value="both">Both</MenuItem>
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
        <br />
        <br />
        <Divider style={{ width: "50%" }}></Divider>
        <br />

        <Button variant="outlined" onClick={handleSave}>
          Save
        </Button>
        {saveText}
        <Button variant="outlined" onClick={currentPreferences}>
          Get Current Preferences
        </Button>
        {currPrefText}
        <br />
        <br />
        <Typography variant="h8">
          This information is used to tailor our route rankings to best suit
          your preferences.
        </Typography>
      </Grid>
    </>
  ) : (
    ""
  );
}
