import React, { useState } from 'react';
import axios from 'axios';
import { Header } from '.';

const Registro = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setRegisterError] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar que todos los campos estén llenos
        if (!firstName || !lastName || !email || !password) {
            setRegisterError(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/user', {
                name: firstName,
                lastName,
                email,
                username: email.split('@')[0], // Generar username
                password,
            });

            if (response.status === 201) {
                setRegisterSuccess(true);
                setRegisterError(false);
                // Redirigir al login después de 2 segundos
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                throw new Error('Error al registrar el usuario');
            }
        } catch (error) {
            console.error(error);
            setRegisterError(true);
        }
    };

    return (
        <div>
            <Header />
            <div className="container py-5">
                <h2 className="text-center mb-4">Crear una Cuenta</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form id="registerForm" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control my-2"
                                    id="firstName"
                                    placeholder="Ingresa tu nombre"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Apellido</label>
                                <input
                                    type="text"
                                    className="form-control my-2"
                                    id="lastName"
                                    placeholder="Ingresa tu apellido"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="form-control my-2"
                                    id="email"
                                    placeholder="Ingresa tu correo"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control my-2"
                                    id="password"
                                    placeholder="Crea una contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn custom-bg btn-block text-white my-2">
                                Registrarse
                            </button>
                            {registerError && (
                                <div id="registerError" className="alert alert-danger mt-3">
                                    Error al registrar. Por favor, inténtalo de nuevo.
                                </div>
                            )}
                            {registerSuccess && (
                                <div id="registerSuccess" className="alert alert-success mt-3">
                                    ¡Registro exitoso! Redirigiendo al login...
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Registro;
