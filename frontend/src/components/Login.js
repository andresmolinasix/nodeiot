import React, { useState } from 'react';
import axios from 'axios';
import { Header } from '.';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate(); // Crea una instancia de navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setLoginError(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                username,
                password,
            });

            if (response.status === 200) {
                setLoginError(false);
                // Redirigir a la URL /test
                navigate('/home'); // Redirige a /test
            } else {
                throw new Error('Error al iniciar sesión');
            }
        } catch (error) {
            console.error(error);
            setLoginError(true);
        }
    };

    return (
        <div>
            <Header />
            <div className="container py-5">
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form id="loginForm" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Nombre de Usuario</label>
                                <input
                                    type="text"
                                    className="form-control my-2"
                                    id="username"
                                    placeholder="Ingresa tu nombre de usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control my-2"
                                    id="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-block text-white my-2 custom-bg">
                                Ingresar
                            </button>
                            {loginError && (
                                <div id="loginError" className="alert alert-danger mt-3">
                                    Usuario o contraseña incorrectos.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
