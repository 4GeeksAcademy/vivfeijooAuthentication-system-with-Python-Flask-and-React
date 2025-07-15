import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes.jsx";
import { StoreProvider } from "./hooks/useGlobalReducer.jsx";
import BackendURL from "./components/BackendURL.jsx";

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <BrowserRouter>
            <StoreProvider>
                <BackendURL>
                    <AppRoutes />
                </BackendURL>
            </StoreProvider>
        </BrowserRouter>
    </React.StrictMode>
);

