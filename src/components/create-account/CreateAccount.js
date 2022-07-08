import { Grid, Typography, Button } from "@mui/material";
import "../../components-styling/colours.css";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginState } from "../../actions";
import { signUpCurl } from "../../async-functions/async";
import { getCookieValidationCurl } from "../../async-functions/async";
import {validate} from "email-validator";

let email = "";
let name = ""
let userPass = "";
export default function CreateAccount() {
  const navigate = useNavigate();
  const loginUser=useSelector(state=>state.loginState);
  const [userError,setUserError]=useState(false);
  const [passError,setPassError]=useState(false);
  const [userErrorMessage,setUserErrorMessage]=useState("");
  const [passErrorMessage,setPassErrorMessage]=useState("");
  const dispatch=useDispatch();
  const errorMsg =data =>{return `Missing ${data}`};
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
    setPassError(true);
    setUserError(false);
    setPassErrorMessage(errorMsg("Password"));
    setUserErrorMessage("");
  };

  const failStrengthPass=(data)=>{
    setPassError(true);
    setUserError(false);
    setPassErrorMessage(data);
    setUserErrorMessage("");
  };
  const failUser = () => {
    setUserError(true);
    setPassError(false);
    setPassErrorMessage("");
    setUserErrorMessage(errorMsg("Email"));
  };
  const failBoth = () => {
    setUserError(true);
    setPassError(true);
    setPassErrorMessage(errorMsg("Password"));
    setUserErrorMessage(errorMsg("Email"));
  };

  const verifyFunc = () => {
    // TODO: create account in database
    email = "";
    name = ""
    userPass = "";
    navigate("/verify");
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
      <Typography variant="h4">Hi there! We are here to help</Typography>
      <br />
      <TextField error={userError} helperText={userErrorMessage} variant="filled" required label="Email" onChange={(event)=>
      {email=event.target.value;
      }}></TextField>
      <br />
      <TextField label="Name" onChange={(event)=>
      {name=event.target.value;
      }}></TextField>
      <br />
      <TextField  error={passError} helperText={passErrorMessage} variant="filled" type="password" required label="Password" onChange={(event)=>
        {userPass=event.target.value;
        }}></TextField>
      <br />
      <span>
        <Button variant="outlined" onClick={()=>{
          if (userPass==="" && email===""){
            failBoth();          
           }
           else if (userPass===""){
             failPass(); 
           }
           else if (email===""){
             failUser();
           }else{
             signUpCurl({"email":email,"userName":name,"userPass":userPass}).then(data=>{
             if(data["status"]===1){
               setPassError(false);
               setPassErrorMessage("");
               setUserError(true);
               setUserErrorMessage("Require a valid email");
             }
             if(data["status"]===2){
              setPassError(false);
              setPassErrorMessage("");
              setUserError(true);
              setUserErrorMessage("Email already exist");
            }
            if(data["status"]===3){
              failStrengthPass(data["error"]);
            }
             else if(data["status"]===0){
               dispatch(loginState(email));
               verifyFunc();
             }
             }).catch((error)=>{
              console.log(error);
            });
           }

        }}>
          Sign Up
        </Button>
      </span>
    </Grid>
    </>
  ):"";
}
