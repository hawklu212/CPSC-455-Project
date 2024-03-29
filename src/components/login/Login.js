import { Grid, Typography, Button, Divider } from "@mui/material";
import "../../components-styling/colours.css";
import { TextField } from "@mui/material";
import image from "./stock.jpg"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useEffect, useState } from "react";
import { loginCurl } from "../../async-functions/async";
import { loginState } from "../../actions";
import { getCookieValidationCurl } from "../../async-functions/async";
import { validate } from "email-validator";
let email = "";
let userPass = "";
export default function Login() {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginState);
  const navigate = useNavigate();
  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState("");
  const [passErrorMessage, setPassErrorMessage] = useState("");
  const errorMsg = (data) => {
    return `Missing or Wrong ${data}`;
  };
  const failPass = () => {
    setPassError(true);
    setUserError(false);
    setPassErrorMessage(errorMsg("Password"));
    setUserErrorMessage("");
  };
  useEffect(() => {
    getCookieValidationCurl()
      .then((res) => {
        if (res.status === 200) {
          dispatch(loginState(""));
          navigate("./profile");
        } else {
          dispatch(loginState("NoUser"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const failUser = () => {
    setUserError(true);
    setPassError(false);
    setPassErrorMessage("");
    setUserErrorMessage(errorMsg("Username"));
  };

  const failBoth = () => {
    setUserError(true);
    setPassError(true);
    setPassErrorMessage(errorMsg("Password"));
    setUserErrorMessage(errorMsg("Username"));
  };

  const loginAttempt = () => {
    email = "";
    userPass = "";
    navigate("../profile");
  };
  const signUp = () => {
    email = "";
    userPass = "";
    navigate("../create-account");
  };

  const recovery = () => {
    email = "";
    userPass = "";
    navigate("../recovery");
  };

  const verify = () => {
    email = "";
    userPass = "";
    navigate("../verify");
  };

  return loginUser !== "" ? (
    <>
      <Grid
        className="yellow-2"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ 
        minHeight: "100vh",
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat' 
           }}
      >
        <Typography variant="h2">A11yMaps</Typography>
        <br />
        <br />
        <br />
        <Typography variant="h4"style = {{
          textShadow: '1px 1px #808080',
        }}
        >Welcome Back!</Typography>
        <br />
        <TextField
          error={userError}
          helperText={userErrorMessage}
          required
          variant="filled"
          label="Email"
          style ={{
            background: "white",
            opacity: 0.8,
        }}
          onChange={(event) => {
            email = event.target.value;
          }}
        ></TextField>
        <br />
        <TextField
          error={passError}
          helperText={passErrorMessage}
          required
          label="Password"
          type="password"
          style ={{
            background: "white",
            opacity: 0.8}}
          onChange={(event) => {
            userPass = event.target.value;
          }}
        ></TextField>
        <br />
        <span>
          <Button
            style ={{
            background: "white",
            opacity: 0.8}}
            variant="outlined"
            onClick={() => {
              if (userPass === "" && email === "") {
                failBoth();
              } else if (userPass === "") {
                failPass();
              } else if (email === "" || !validate(email)) {
                failUser();
              } else {
                loginCurl({ email: email, userPass: userPass })
                  .then((data) => {
                    if (data["status"] === 1) {
                      setPassError(false);
                      setPassErrorMessage("");
                      setUserError(true);
                      setUserErrorMessage("Username/Email does not exist");
                    } else if (data["status"] === 2) {
                      setPassError(true);
                      setPassErrorMessage("Password or Username is Incorrect");
                      setUserError(true);
                      setUserErrorMessage("");
                    } else if (data["status"] === 3) {
                      setPassError(false);
                      setPassErrorMessage("");
                      setUserError(true);
                      setUserErrorMessage("Username/Email not Verified");
                    } else if (data["status"] === 0) {
                      dispatch(loginState(data["accessToken"]));
                      loginAttempt();
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }
          }
          >
            Sign in
          </Button>
        </span>
        <br />
        <br />
        <br />
        <Divider></Divider>
        <Typography variant="h6"style = {{
          textShadow: '1px 1px #808080',
        }}>
          Don&apos;t have an account? Sign up here!
        </Typography>
        <br />
        <Button variant="outlined" onClick={signUp} 
        style ={{
            background: "white",
            opacity: 0.8}}>
          Sign up
        </Button>
        <br />
        <Typography variant="h6"
        style = {{
          textShadow: '1px 1px #808080',
        }}>
          Forgot password or need to verify an account?
        </Typography>
        <br />
        <span>
          <Button variant="outlined" onClick={recovery}
          style ={{
            background: "white",
            opacity: 0.8}}>
            Recover Password
          </Button>
          <Button variant="outlined" onClick={verify}
          style ={{
            background: "white",
            opacity: 0.8}}>
            Verify Account
          </Button>
        </span>
        <br />
      </Grid>
    </>
  ) : (
    ""
  );
}
