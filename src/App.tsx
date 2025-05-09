import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { UrlRedirect } from "./Pages/UrlRedirect/UrlRedirect";
import "./App.module.scss";
import { Tracking } from "./Pages/Tracking/Tracking";
import { Login } from "./Pages/Login/Login";
import { UserProvider } from "./Context/UserContext";

export const App = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:id" element={<UrlRedirect />}></Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
};
