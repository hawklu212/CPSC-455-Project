import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import MAIN_CONTAINER from "./components/MainContainer";
import Login from "./components/login/Login";
import CreateAccount from "./components/create-account/CreateAccount";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/search" element={<MAIN_CONTAINER />} />
    </Routes>
  );
}

export default App;
