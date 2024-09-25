import React from 'react';
import { HeaderDos } from '.';
import MapComponent from './MapComponent';
import LineChart from './LineChart';
import HistogramChart from './HistogramChart';
import AnomalyList from './AnomalyList';
import { CategorySelector } from './';
import { useParams } from 'react-router-dom'; // Importar useParams

const Dashboard = () => {
    const { categoryD } = useParams(); // Obtener el valor de username desde los parámetros de la URL
    console.log('1', categoryD)
    return (
        <div>
            <HeaderDos />
            <div className="container-fluid mt-3" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <div className="row" style={{ flex: 1 }}>
                    <div className="col-md-6 border" id="map">
                        {/* Sector 1: Maps */}
                        <MapComponent />  {/* Pasar el prop category */}
                    </div>
                    <div className="col-md-3 border overflow-auto" id="points-list">
                        {/* Sector 2: Lista de puntos */}
                        <CategorySelector categoryC={categoryD} />  {/* Pasar el prop category */}
                    </div>
                    <div className="col-md-3 border" id="point-info" style={{ height: '400px', overflowY: 'auto' }}>
                        {/* Sector 3: Información específica */}
                        <AnomalyList  />  {/* Pasar el prop category si es necesario */}
                    </div>
                </div>
                <div className="row" style={{ flex: 1 }}>
                    <div className="col-md-6 border" id="line-chart">
                        {/* Sector 4: Gráfica de línea */}
                        <LineChart  />  {/* Pasar el prop category si es necesario */}
                    </div>
                    <div className="col-md-6 border overflow-auto" id="anomalies-history">
                        {/* Sector 5: Gráfica de línea */}
                        <HistogramChart  />  {/* Pasar el prop category si es necesario */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
