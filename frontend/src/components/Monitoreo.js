import React from 'react';
import { HeaderDos } from '.';

const Monitoreo = () => {
    return (
        <div>
            <HeaderDos />
            <div className="container my-5">
                <h2 className="text-center mb-4">Monitoreo de Datos</h2>

                <div className="mb-4">
                    <label htmlFor="tableSelect" className="form-label">Selecciona una Tabla:</label>
                    <select className="form-select" id="tableSelect">
                        <option value="">Seleccione...</option>
                        <option value="tabla1">Tabla 1</option>
                        <option value="tabla2">Tabla 2</option>
                        <option value="tabla3">Tabla 3</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="variableSelect" className="form-label">Selecciona una Variable:</label>
                    <select className="form-select" id="variableSelect">
                        <option value="">Seleccione...</option>
                        <option value="variable1">Variable 1</option>
                        <option value="variable2">Variable 2</option>
                        <option value="variable3">Variable 3</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="optionSelect" className="form-label">Selecciona una Opción:</label>
                    <div className="d-flex">
                        <select className="form-select me-2" id="optionSelect">
                            <option value="">Seleccione...</option>
                            <option value="pca">PCA</option>
                            <option value="serieTiempo">Serie de Tiempo</option>
                        </select>
                        <button className="btn btn-primary">Graficar</button>
                    </div>
                </div>

                <h4 className="mb-3">Tablas Cargadas:</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre de la Tabla</th>
                            <th>Descripción</th>
                            <th>Fecha de Carga</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Tabla de Ejemplo 1</td>
                            <td>Descripción de la tabla 1</td>
                            <td>01/01/2024</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Tabla de Ejemplo 2</td>
                            <td>Descripción de la tabla 2</td>
                            <td>01/02/2024</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Tabla de Ejemplo 3</td>
                            <td>Descripción de la tabla 3</td>
                            <td>01/03/2024</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Monitoreo;
