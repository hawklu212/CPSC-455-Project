import { Grid, Typography, Button, Divider } from "@mui/material";
import "../../components-styling/colours.css";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const navigate = useNavigate;

  const signUp = () => {
    // TODO: create account in database
    navigate("../search");
  };

  return (
    <Grid
      className="yellow-2"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Typography variant="h2">A11yMaps</Typography>
      <br />
      <br />
      <br />
      <Typography variant="h4">Hi there! We're here to help</Typography>
      <br />
      <TextField variant="filled" label="Username"></TextField>
      <br />
      <TextField label="Password"></TextField>
      <br />
      <span>
        <Button variant="outlined" onClick={signUp}>
          Sign Up
        </Button>
      </span>
    </Grid>
  );
}
