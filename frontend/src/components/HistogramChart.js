import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { HeaderDos } from '.';

// Registrar todos los componentes necesarios de Chart.js
Chart.register(...registerables);

const HistogramChart = ({ categoryC }) => {
    const categoryTags = {
        empresa_de_energia: [
            'MQTT_BAQ_EMCP_1_Gas_Flow_G1', 'MQTT_BAQ_EMCP_1_engine_oil_press',
            'MQTT_BAQ_EMCP_1_exhaust_nox', 'HINTER_CAR_CH1_COND_OUT_TEMP',
            'HINTER_CAR_CH1_REF_SUCT_TEMP'
        ],
        acueducto_tunja: [
            'SECTOR_28_COCA_COLA_PATEC_1300_CAUDAL', 'SECTOR_1_STA_CATALINA_PATEC_491_CAUDAL',
            'SECTOR_17_COLEG_BOYACA_PATEC607_CAUDAL', 'SECTOR_11_EL_RECREO_PATEC_527_Flow',
            'SECTOR_11_EL_RECREO_PATEC_527_CAUDAL'
        ],
        acueducto_monteria: [
            'MON_ZONA4_CAP4_CAUDAL', 'MON_ZONA4_CAP4_Flow',
            'MON_ZONA4_SECTOR101_RGRANDE_CAUDAL', 'MON_ZONA5_PTAPIGUANAS1_CAUDAL'
        ],
        empresa_lactea: [
            'PTAR_EMPRESA_LACTEA_SOL_SUSPENDIDOS_CAF', 'PTAR_EMPRESA_LACTEA_SOL_SUSPENDIDOS_LINEA_EMPRESA_LACTEA',
            'PTAR_EMPRESA_LACTEA_TURBIDEZ_CAF', 'PTAR_EMPRESA_LACTEA_pH_RB'
        ]
    };

    const [data, setData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(''); // Cambiar a category

    // Fetch de los datos desde el backend
    useEffect(() => {
        axios.get('http://localhost:4002/api/linecharts')
            .then(response => {
                console.log('Datos recibidos:', response.data); // Comprobamos los datos que llegan
                setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos', error);
            });
    }, []);

    // Renderizar múltiples histogramas, uno por cada tag de la categoría seleccionada
    const renderHistograms = () => {
        if (!categoryC || !categoryTags[categoryC]) {
            return <p>No hay datos disponibles para la categoría seleccionada.</p>;
        }

        const selectedTags = categoryTags[categoryC];

        return (
            <div className="flex overflow-x-auto" style={{ whiteSpace: 'nowrap' }}>
                {selectedTags.map(tag => {
                    if (data[tag]) {
                        const moments = data[tag].moments || [];
                        const values = data[tag].values || [];

                        if (values.length > 0 && moments.length > 0) {
                            const datasets = [
                                {
                                    label: `Valor de ${tag}`,
                                    data: values,
                                    backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`,
                                }
                            ];

                            return (
                                <div key={tag} className="my-1" style={{ display: 'inline-block', width: '100%' }}>
                                    <label className='fw-bold mb-4'>{`Histograma para el tag: ${tag}`}</label>
                                    <div className="chart-container my-4" style={{ width: '100%' }}>
                                        <Bar
                                            data={{
                                                labels: moments,
                                                datasets: datasets,
                                            }}
                                            options={{
                                                scales: {
                                                    y: { beginAtZero: true },
                                                    x: { title: { display: true, text: 'Momento' } },
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        }
                    }
                    return <p key={tag}>No hay datos suficientes para el tag {tag}.</p>;
                })}
            </div>
        );
    };

    return (
        <div>
            <div className="container">
                <div><h4 className='mt-3 fw-bold' >Distribución de la información</h4></div>

                {Object.keys(data).length === 0 ? (
                    <p>Cargando datos...</p>
                ) : (
                    renderHistograms()  // Renderizar múltiples histogramas
                )}
            </div>
        </div>
    );
};

export default HistogramChart;
