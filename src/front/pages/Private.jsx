import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
        .then(res => {
            if (!res.ok) throw new Error("Unauthorized");
            return res.json();
        })
        .then(data => {
            setMessage(data.msg);
        })
        .catch(() => {
            sessionStorage.removeItem("token");
            navigate("/login");
        });
    }, []);

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-sm p-4" style={{ maxWidth: "600px", width: "100%" }}>
                <h2 className="text-center text-primary mb-4">Zona Privada</h2>
                <p className="fs-5 text-center">{message}</p>
            </div>
        </div>
    );
};
