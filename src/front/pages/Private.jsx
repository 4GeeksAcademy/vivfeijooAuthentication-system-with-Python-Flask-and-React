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
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(res => {
            if (!res.ok) throw new Error("Unauthorized");
            return res.json();
        })
        .then(data => setMessage(data.msg))
        .catch(() => {
            sessionStorage.removeItem("token");
            navigate("/login");
        });
    }, []);

    return (
        <div className="container mt-5">
            <h2>Zona Privada</h2>
            <p>{message}</p>
        </div>
    );
};
