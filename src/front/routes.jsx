import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Private } from "./pages/Private.jsx";
import { Layout } from "./pages/Layout.jsx";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/demo" element={<Demo />} />
                    <Route path="/single/:theid" element={<Single />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/private" element={<Private />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;

