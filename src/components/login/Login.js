import { Grid, Typography, Button, Divider } from "@mui/material";
import "../../components_styling/colours.css";
import { TextField } from "@mui/material";

export default function Login() {
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
      <Typography variant="h4">Welcome Back!</Typography>
      <br />
      <TextField variant="filled" label="Username"></TextField>
      <br />
      <TextField label="Password"></TextField>
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
