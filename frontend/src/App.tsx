import { Route, Routes } from "react-router";
import "./App.css";
import { Layout as Auth } from "./modules/auth/Layout";
import { Layout as Main } from "./modules/main/Layout";
import Register from "./modules/auth/Register";
import Login from "./modules/auth/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

function Home() {
  return <div>Home</div>;
}

export default App;
