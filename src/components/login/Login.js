import { Grid, Typography, Button, Divider } from "@mui/material";
import "../../components-styling/colours.css";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useState } from "react";
import { postCurl } from "../../async_functions/async";
import { loginState } from "../../actions";

var userName="";
var userPass="";

export default function Login() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [userError,setuserError]=useState(false);
  const [passError,setpassError]=useState(false);
  const [userErrorMessage,setuserErrorMessage]=useState("");
  const [passErrorMessage,setpassErrorMessage]=useState("");
  let errorMSG =data =>{return `Missing ${data}`};
  const failpass=()=>{
    setpassError(true);
    setuserError(false);
    setpassErrorMessage(errorMSG("Password"));
    setuserErrorMessage("");  
  }
  
  const failuser=()=>{
    setuserError(true);
            setpassError(false);
            setpassErrorMessage("");
            setuserErrorMessage(errorMSG("Username"));
  }

  const failboth=()=>{
    setuserError(true);
            setpassError(true);
            setpassErrorMessage(errorMSG("Password"));
            setuserErrorMessage(errorMSG("Username"));
  }

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
    <>
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
      <TextField error={userError} helperText={userErrorMessage} required variant="filled" label="Username" onChange={(event)=>
      {userName=event.target.value;
        console.log(userName);
      }}></TextField>
      <br />
      <TextField error={passError} helperText={passErrorMessage} required label="Password" type="password" onChange={(event)=>
        {userPass=event.target.value;
          console.log(userPass);
        }}></TextField>
      <br />
      <span>
        <Button variant="outlined" onClick={()=>{
          if (userPass==="" && userName===""){
           failboth();          
          }
          else if (userPass===""){
            failpass(); 
          }
          else if (userName===""){
            failuser();
          }else{
            postCurl({"userName":userName,"userPass":userPass}).then(data=>{
            if(data["status"]===1){
              setpassError(false);
              setpassErrorMessage("");
              setuserError(true);
              setuserErrorMessage("Username does not exist");
            }else if(data["status"]===2){
              setpassError(true);
              setpassErrorMessage("Password is Incorrect");
              setuserError(false);
              setuserErrorMessage("");
            }
            else if(data["status"]===0){
              dispatch(loginState(data["userName"]));
              navigate("../search");
            }
            });
          }
          //loginAttempt();
        }}>Sign in</Button>
      </span>
      <br />
      <br />
      <br />
      <Divider></Divider>
      <Typography variant="h6">Don't have an account? Sign up here!</Typography>
      <br />
      <Button variant="outlined">Sign up</Button>
    </Grid>
    </>
  );
}
