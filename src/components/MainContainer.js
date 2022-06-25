import Title from "./TitleDiv";
import TopDiv from "./top-components/TopDiv";
import BottomDiv from "./bottom-components/BottomDiv";
import Navigation from "./Navigation";
import { useEffect } from "react";
import { loginState } from "../actions";
import { useDispatch, useSelector } from "react-redux";
export default function MainContainer() {
  const dispatch=useDispatch();
  const loginUser=useSelector(state=>state.loginState);
  useEffect(() => {
    if(loginUser!==""){
      localStorage.setItem("user",loginUser);
      return;
    }
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser!== "undefined") {
      dispatch(loginState(loggedInUser));
    } else{
      dispatch(loginState("None"));
    }
  }, []);
  return (
    <div>
      <Navigation></Navigation>
      <Title />
      <div>
        <TopDiv />
      </div>
      <div>
        <BottomDiv />
      </div>
    </div>
  );
}
