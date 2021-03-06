import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainContainer from "./components/MainContainer";
import Login from "./components/login/Login";
import CreateAccount from "./components/create-account/CreateAccount";
import VerifyAccount from "./components/verify-account/VerifyAccount";
import RecoverAccountPassword from "./components/recover-account/RecoverAccountPassword";
import Profile from "./components/profile/Profile";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/verify" element={<VerifyAccount />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/search" element={<MainContainer />} />
      <Route path="/recovery" element={<RecoverAccountPassword />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
