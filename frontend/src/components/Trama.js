import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HeaderTres } from '.';

const Trama = () => {
    const navigate = useNavigate();
    const handleCancelar = () => {
        navigate('/home');
    };

    const [nombreTrama, setNombreTrama] = useState('');
    const handleCrear = async () => {
        try {
            const response = await axios.post('http://localhost:3004/api/trama', { nombreTrama });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <HeaderTres />
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card" style={{ width: '90%' }}>
                    <div className="row no-gutters">
                        <div className="col-md-6 p-3 col-md-6 p-3 d-flex align-items-center">
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Ingrese el nombre de la trama</h5>
                                <form>
                                    <div className="form-group mt-2">
                                        <input type="text" className="form-control" placeholder="Ej: Acueducto de Tunja" />
                                    </div>
                                    <button className="btn btn-enter mt-2" onClick={handleCrear}>Crear</button>
                                    <button className="btn btn-salirD mt-2 mx-3 text-black" onClick={handleCancelar}>Cancelar</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img src="/CrearTramaD.jpg" alt="Imagen" className="card-img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trama;