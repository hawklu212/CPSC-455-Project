import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import MAIN_CONTAINER from "./components/MAIN_CONTAINER";
import TOP_DIV from "./components/TOP_COMPONENTS/TOP_DIV";
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
