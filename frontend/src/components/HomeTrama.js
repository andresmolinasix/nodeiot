import React from 'react';
import { HeaderCuatro } from '.';
import { Link } from 'react-router-dom';

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
            <HeaderCuatro />
            <div className="container py-5">
                <div className="text-start mb-4">
                    <h2>Bienvenido. {username}</h2>
                    <h5>Fecha: {date}</h5>
                    <p className="card-text">
                        En este portal usted puede gestionar cada una de las tramas de su operación, agregar una nueva, modificar una existente y los monitorea de señal de sus dispositivos IoT (MQTT,MODBUS y PROFIBUS) que incluye alertas en tiempo real de anómalias.
                    </p>
                </div>

                <div className="row mt-4">
                    <div className="col-md-6">
                        <Link
                            to="/dashboard/acueducto_tunja"
                            className="card text-center border-primary mb-3 text-decoration-none"
                        >
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Acueducto de Tunja</h5>
                                <p className="card-text">
                                    Última fecha de acceso: {date}
                                </p>
                            </div>
                        </Link>

                    </div>
                    <div className="col-md-6">
                        <Link
                            to="/dashboard/acueducto_monteria"
                            className="card text-center border-primary mb-3 text-decoration-none"
                        >
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Acueducto de Montería</h5>
                                <p className="card-text">
                                    Última fecha de acceso: {date}
                                </p>
                            </div>
                        </Link>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Link
                            to="/dashboard/empresa_de_energia"
                            className="card text-center border-primary mb-3 text-decoration-none"
                        >
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Empresa de Energía</h5>
                                <p className="card-text">
                                    Última fecha de acceso: {date}
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <Link
                            to="/anomalias"
                            className="card text-center border-primary mb-3 text-decoration-none"
                        >
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Empresa de Lácteos</h5>
                                <p className="card-text">
                                    Última fecha de acceso: {date}
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <Link
                            to="/nuevatrama"
                            className="card text-center border-primary mb-3 text-decoration-none"
                        >
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Crear nueva trama</h5>
                                <span className="material-icons">add_circle</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
