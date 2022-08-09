import { Grid, Typography, Button } from "@mui/material";
import "../../components-styling/colours.css";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginState } from "../../actions";
import {
  verificationCurl,
  recoverySendCodeCurl,
} from "../../async-functions/async";
import { getCookieValidationCurl } from "../../async-functions/async";
import { validate } from "email-validator";

let email = "";
let verificationCode = "";
export default function VerifyAccount() {
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state.loginState);
  const [emailSendError, setEmailSendError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [verificationErrorMessage, setVerificationErrorMessage] = useState("");
  const dispatch = useDispatch();
  const errorMsg = (data) => {
    return `Missing or Wrong ${data}`;
  };
  useEffect(() => {
    getCookieValidationCurl()
      .then((res) => {
        if (res.status === 200) {
          dispatch(loginState(""));
          navigate("../profile");
        } else {
          if (loginUser === "") {
            dispatch(loginState("NoUser"));
            email = "noUser";
          } else {
            email = loginUser;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const failPass = () => {
    setVerificationError(true);
    setEmailError(false);
    setVerificationErrorMessage(errorMsg("Code"));
    setEmailErrorMessage("");
  };
  const failUser = () => {
    setEmailError(true);
    setVerificationError(false);
    setVerificationErrorMessage("");
    setEmailErrorMessage(errorMsg("Email"));
  };
  const failBoth = () => {
    setEmailError(true);
    setVerificationError(true);
    setVerificationErrorMessage(errorMsg("Code"));
    setEmailErrorMessage(errorMsg("Email"));
  };

  const signUpFunc = () => {
    // TODO: create account in database
    email = "";
    verificationCode = "";
    navigate("/profile");
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
        style={{ minHeight: "100vh" }}
      >
        <Typography variant="h2">A11yMaps</Typography>
        <br />
        <br />
        <br />
        <Typography variant="h4">
          Hi there! Please enter and send the verification code sent to your email
        </Typography>
        <br />
        <TextField
          defaultValue={loginUser}
          error={emailError}
          helperText={emailErrorMessage}
          required
          variant="filled"
          label="Email"
          onChange={(event) => {
            email = event.target.value;
          }}
        ></TextField>
        <br />
        <TextField
          error={verificationError}
          helperText={verificationErrorMessage}
          type="password"
          required
          label="Verification Code"
          onChange={(event) => {
            verificationCode = event.target.value;
          }}
        ></TextField>
        <br />
        <h3>{emailSendError}</h3>
        <span>
          <Button
            variant="outlined"
            onClick={async () => {
              setEmailSendError("");
              if (email === "" || !validate(email)) {
                failUser();
              } else {
                try {
                  const res = await recoverySendCodeCurl({ email: email });
                  setEmailSendError(`Code sent to ${res["userName"]}`);
                } catch (error) {
                  console.log(error);
                }
              }
            }}
          >
            Send Verification Code
          </Button>
          <br/>
          <center><Button
            variant="outlined"
            onClick={async () => {
              setEmailSendError("");
              if (verificationCode === "" && email === "") {
                failBoth();
              } else if (verificationCode === "") {
                failPass();
              } else if (email === "" || !validate(email)) {
                failUser();
              } else {
                try {
                  const res = await verificationCurl({
                    email: email,
                    verificationCode: verificationCode,
                  });
                  if (res["status"] === 1) {
                    failUser();
                    return;
                  }
                  if (res["status"] === 2) {
                    failPass();
                    return;
                  } else {
                    dispatch(loginState(res["accessToken"]));
                    signUpFunc();
                  }
                } catch (error) {
                  console.log(error);
                }
              }
            }}
          >
            Verify Account
          </Button>
          </center>
        </span>
      </Grid>
    </>
  ) : (
    ""
  );
}
