import { Grid, Typography, Button, Divider } from "@mui/material";
import "../../components-styling/colours.css";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";

export default function Login() {
  const navigate = useNavigate();

  const loginAttempt = () => {
    //TODO: add authentication (maybe following this? https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications)
    // if login attempt succeeds, then:
    navigate("../search");
  };
  const signUp = () => {
    //NTH: maybe carry over username if it is already entered
    navigate("../create-account");
  };

  return (
    <Grid
      className="yellow-2"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}>
      <Typography variant="h2">A11yMaps</Typography>
      <br />
      <br />
      <br />
      <Typography variant="h4">Welcome Back!</Typography>
      <br />
      <TextField variant="filled" label="Username"></TextField>
      <br />
      <TextField label="Password" type="password"></TextField>
      <br />
      <span>
        <Button variant="outlined">Sign in</Button>
      </span>
      <br />
      <br />
      <br />
      <Divider></Divider>
      <Typography variant="h6">Don't have an account? Sign up here!</Typography>
      <br />
      <Button variant="outlined">Sign up</Button>
    </Grid>
  );
}
