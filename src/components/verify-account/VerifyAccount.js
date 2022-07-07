import { Grid, Typography, Button } from "@mui/material";
import "../../components-styling/colours.css";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginState } from "../../actions";
import { verificationCurl } from "../../async-functions/async";
import { getCookieValidationCurl } from "../../async-functions/async";

let email = "";
let verificationCode = "";
export default function VerifyAccount() {
  const navigate = useNavigate();
  const loginUser=useSelector(state=>state.loginState);
  const [emailError,setEmailError]=useState(false);
  const [verificationError,setVerificationError]=useState(false);
  const [emailErrorMessage,setEmailErrorMessage]=useState("");
  const [verificationErrorMessage,setVerificationErrorMessage]=useState("");
  const dispatch=useDispatch();
  const errorMsg =data =>{return `Missing or Wrong ${data}`};
  useEffect(() => {
    getCookieValidationCurl().then(res=>{
      if (res.status===200){
        dispatch(loginState(""));
        navigate("../search");
      }else{
        dispatch(loginState("NoUser"));
      }
    }).catch((error)=>{
      console.log(error);
    });
  },[]);
  const failPass=()=>{
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
      <span>
        <Button variant="outlined" onClick={async ()=>{
          if (verificationCode==="" && email===""){
            failBoth();          
           }
           else if (verificationCode===""){
             failPass(); 
           }
           else if (email===""){
             failUser();
           }else{
          try{
           const res=await verificationCurl({email:email,verificationCode:verificationCode});
            if (res["status"]===1){
              failUser();
              return;
            }
            if (res["status"]===2){
              failPass();
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
          Verify
        </Button>
      </span>
    </Grid>
    </>
  ):"";
}
