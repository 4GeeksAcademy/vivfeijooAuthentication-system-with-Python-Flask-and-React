import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            sessionStorage.setItem("token", data.token);
            navigate("/private");
        } else {
            alert(data.msg || "Credenciales inválidas");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
                <input type="email" className="form-control my-2" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                <input type="password" className="form-control my-2" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />
                <button className="btn btn-success mt-2" type="submit">Entrar</button>
            </form>
        </div>
    );
};
