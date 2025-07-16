import React from "react";
import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Private } from "./pages/Private.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/private" element={<Private />} />
        </Routes>
    );
};

export default AppRoutes;
