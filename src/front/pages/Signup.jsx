import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            alert("Usuario creado exitosamente");
            navigate("/login");
        } else {
            const data = await response.json();
            alert(data.msg || "Error al registrarse");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" className="form-control my-2" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                <input type="password" className="form-control my-2" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />
                <button className="btn btn-primary mt-2" type="submit">Registrar</button>
            </form>
        </div>
    );
};
