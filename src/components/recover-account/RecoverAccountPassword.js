import { Grid, Typography, Button } from "@mui/material";
import "../../components-styling/colours.css";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginState } from "../../actions";
import { recoveryCurl, recoverySendCodeCurl,getCookieValidationCurl } from "../../async-functions/async";
import {validate} from "email-validator";


let email = "";
let verificationCode = "";
let newPass="";
let confirmPass="";
export default function RecoverAccountPassword() {
  const navigate = useNavigate();
  const loginUser=useSelector(state=>state.loginState);
  const [emailSendError,setEmailSendError]=useState("");
  const [emailError,setEmailError]=useState(false);
  const [verificationError,setVerificationError]=useState(false);
  const [newPassError,setNewPassError]=useState(false);
  const [confirmPassError,setConfirmPassError]=useState(false);
  const [emailErrorMessage,setEmailErrorMessage]=useState("");
  const [verificationErrorMessage,setVerificationErrorMessage]=useState("");
  const [newPassErrorMessage,setNewPassErrorMessage]=useState("");
  const [confirmPassErrorMessage,setConfirmPassErrorMessage]=useState("");
  const dispatch=useDispatch();
  const errorMsg =data =>{return `Missing ${data}`};
  useEffect(() => {
    getCookieValidationCurl().then(res=>{
      if (res.status===200){
        dispatch(loginState(""));
        navigate("../search");
      }else{
        if (loginUser===""){
        dispatch(loginState("NoUser"));
        email="noUser";
        }else {
          email=loginUser;
        }
      }
    }).catch((error)=>{
      console.log(error);
    });
  },[]);
  const resetEmail=()=>{
    setEmailError(false);
    setEmailErrorMessage(""); 
  }
  const resetVerification=()=>{
    setVerificationError(false);
    setVerificationErrorMessage("");
  }
  const resetNewPass=()=>{
    setNewPassError(false);
    setNewPassErrorMessage("");
  }
  const resetConfirmPass=()=>{
    setConfirmPassError(false);
    setConfirmPassErrorMessage("");
  }
  const failVerification=()=>{
    setVerificationError(true);
    setVerificationErrorMessage(errorMsg("Code"));
    resetEmail();
    resetConfirmPass();
    resetNewPass();
  };
  const failEmail = () => {
    setEmailError(true);
    setEmailErrorMessage(errorMsg("Email"));
    resetVerification();
    resetConfirmPass();
    resetNewPass();
  };
  const failInitialPass = () => {
    setNewPassError(true);
    setNewPassErrorMessage(errorMsg("Password"));
    resetVerification();
    resetConfirmPass();
    resetEmail();
  };
  const failConfirmPass = () => {
    setConfirmPassError(true);
    setConfirmPassErrorMessage("Password has to match");
    resetVerification();
    resetNewPass();
    resetEmail();
  };

  const signUpFunc = () => {
    // TODO: create account in database
    navigate("/search");
  };

  return loginUser!==""?(
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
      <Typography variant="h4">Hi there! Please enter the verification code sent to your email</Typography>
      <br />
      <TextField error={emailError} helperText={emailErrorMessage} variant="filled" required label="Email" onChange={(event)=>
      {email=event.target.value;
      }}></TextField>
      <br />
      <TextField  error={verificationError} helperText={verificationErrorMessage} type="password" required label="Verification Code" onChange={(event)=>
        {verificationCode=event.target.value;
        }}></TextField>
      <br />
      <TextField  error={newPassError} helperText={newPassErrorMessage} type="password" required label="New Password" onChange={(event)=>
        {newPass=event.target.value;
        }}></TextField>
      <br />
      <TextField  error={confirmPassError} helperText={confirmPassErrorMessage} type="password" required label="Confirm Password" onChange={(event)=>
        {confirmPass=event.target.value;
        }}></TextField>
      <br />
      <h3>{emailSendError}</h3>
      <span>
        <Button variant="outlined" onClick={async ()=>{
          setEmailSendError("");
          if (email==="" || !validate(email)){
            failEmail();
          }else {
            try{
            const res = await recoverySendCodeCurl({email:email});
            setEmailSendError(`Code sent to ${res["userName"]}`);
            } catch (error){
              console.log(error);
            }
          }
        }}>Send Verification Code</Button>
        <Button variant="outlined" onClick={async ()=>{
          setEmailSendError("");
          if (email==="" || !validate(email)){
            failEmail();
          }else if (verificationCode===""){
             failVerification(); 
           }else if (newPass===""){
            failInitialPass();
           } else if (newPass!==confirmPass){
            failConfirmPass();
           }
           else{
          try{
           const res=await recoveryCurl({email:email,verificationCode:verificationCode,userPass:newPass});
            if (res["status"]===1){
              failEmail();
              return;
            }
            if (res["status"]===2){
              failVerification();
              return;
            }else{
              dispatch(loginState(res["accessToken"]));
              signUpFunc();
            }


          } catch (error){
            console.log(error);
          }
             
           }

        }}>
          Reset Password
        </Button>
      </span>
      <h6>{emailSendError}</h6>
    </Grid>
    </>
  ):"";
}
