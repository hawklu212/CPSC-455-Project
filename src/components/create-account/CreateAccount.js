import { Grid, Typography, Button, Divider } from "@mui/material";
import "../../components-styling/colours.css";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginState } from "../../actions";
import { signUpCurl } from "../../async-functions/async";

var userName="";
var userPass="";
export default function CreateAccount() {
  const navigate = useNavigate();
  const [userError,setUserError]=useState(false);
  const [passError,setPassError]=useState(false);
  const [userErrorMessage,setUserErrorMessage]=useState("");
  const [passErrorMessage,setPassErrorMessage]=useState("");
  const dispatch=useDispatch();
  let errorMsg =data =>{return `Missing ${data}`};
  const failPass=()=>{
    setPassError(true);
    setUserError(false);
    setPassErrorMessage(errorMsg("Password"));
    setUserErrorMessage("");  
  };
  const failUser=()=>{
    setUserError(true);
            setPassError(false);
            setPassErrorMessage("");
            setUserErrorMessage(errorMsg("Username"));
  };
  const failBoth=()=>{
    setUserError(true);
            setPassError(true);
            setPassErrorMessage(errorMsg("Password"));
            setUserErrorMessage(errorMsg("Username"));
  };


  const signUpFunc=()=>{
    // TODO: create account in database
    navigate("/search");
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
      style={{ minHeight: "100vh" }}
    >
      <Typography variant="h2">A11yMaps</Typography>
      <br />
      <br />
      <br />
      <Typography variant="h4">Hi there! We're here to help</Typography>
      <br />
      <TextField error={userError} helperText={userErrorMessage} variant="filled" required label="Username" onChange={(event)=>
      {userName=event.target.value;
      }}></TextField>
      <br />
      <TextField  error={passError} helperText={passErrorMessage} type="password" required label="Password" onChange={(event)=>
        {userPass=event.target.value;
        }}></TextField>
      <br />
      <span>
        <Button variant="outlined" onClick={()=>{
          if (userPass==="" && userName===""){
            failBoth();          
           }
           else if (userPass===""){
             failPass(); 
           }
           else if (userName===""){
             failUser();
           }else{
             signUpCurl({"userName":userName,"userPass":userPass}).then(data=>{
             if(data["status"]===1){
               setPassError(false);
               setPassErrorMessage("");
               setUserError(true);
               setUserErrorMessage("Username already exist");
             }
             else if(data["status"]===0){
               dispatch(loginState(data["accessToken"]));
               signUpFunc();
             }
             });
           }

        }}>
          Sign Up
        </Button>
      </span>
    </Grid>
    </>
  );
}
