import React from 'react';
import { HeaderTres } from '.';
import { Link } from 'react-router-dom'; // Importar Link de React Router

const generarFecha = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
};

const UserDashboard = ({ username }) => {
    const date = generarFecha();

    return (
        <div>
            <HeaderTres />
            <div className="container py-5">
                <div className="text-start mb-4">
                    <h2>Bienvenido. {username}</h2>
                    <h5>Fecha: {date}</h5>
                </div>

                <div className="row mt-4">
                    <div className="col-md-6">
                        <a
                            href="http://localhost:3002/red/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card text-center border-primary mb-3 text-decoration-none"
                        >
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Conectar tu sensor</h5>
                                <p className="card-text">
                                    Gestiona y monitorea tus dispositivos IoT de manera eficiente. Utiliza protocolos como MQTT y HTTPS para una comunicación segura, junto con protocolos industriales como MODBUS y PROFIBUS.
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-6">
                        <Link
                            to="/dashboard/empresa_de_energia" // Cambia el valor según lo que necesites
                            className="card text-center border-primary mb-3 text-decoration-none"
                        >
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Data Intelligence</h5>
                                <p className="card-text">
                                    Monitorea el estado y rendimiento de tus dispositivos en tiempo real.
                                </p>
                            </div>
                        </Link>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card text-center border-primary mb-3">
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Localiza</h5>
                                <p className="card-text">
                                    Encuentra la ubicación de tus dispositivos fácilmente.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card text-center border-primary mb-3">
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Conectar Data Lake</h5>
                                <p className="card-text">
                                    Configura y conecta tu base de datos para almacenar datos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
