import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes.jsx";
import { StoreProvider } from "./hooks/useGlobalReducer.jsx";
import { BackendURL } from "./components/BackendURL";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <BrowserRouter>
        <StoreProvider>
            {import.meta.env.VITE_BACKEND_URL === undefined ||
             import.meta.env.VITE_BACKEND_URL === "" ? (
                <BackendURL />
            ) : (
                <AppRoutes />
            )}
        </StoreProvider>
    </BrowserRouter>
</React.StrictMode>
);

