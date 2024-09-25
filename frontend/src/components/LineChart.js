import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { HeaderDos } from '.';

// Registrar todos los componentes necesarios de Chart.js
Chart.register(...registerables);

const LineChart = ({ categoryC }) => {

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
    const [windowSize, setWindowSize] = useState(7); // Tamaño de la ventana inicial
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

    // Calcular los canales (superior e inferior)
    const calculateChannels = (values) => {
        const upperChannel = [];
        const lowerChannel = [];

        for (let i = 0; i < values.length; i++) {
            if (i >= windowSize - 1) {
                const windowValues = values.slice(i - windowSize + 1, i + 1);
                const avg = windowValues.reduce((a, b) => a + b, 0) / windowValues.length;
                const variance = windowValues.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / windowValues.length;
                const stdDevValue = Math.sqrt(variance);
                upperChannel.push(avg + 2 * stdDevValue);
                lowerChannel.push(avg - 2 * stdDevValue);
            } else {
                upperChannel.push(null);
                lowerChannel.push(null);
            }
        }

        return { upperChannel, lowerChannel };
    };

    // Renderizar múltiples gráficos, uno por cada tag de la categoría seleccionada
    const renderLineCharts = () => {
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
                            const { upperChannel, lowerChannel } = calculateChannels(values);

                            const datasets = [
                                {
                                    label: `Valor de ${tag}`,
                                    data: values,
                                    borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
                                    backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`,
                                    fill: true,
                                },
                                {
                                    label: `Canal Superior de ${tag}`,
                                    data: upperChannel,
                                    borderColor: 'rgba(255, 0, 0, 1)',
                                    fill: false,
                                },
                                {
                                    label: `Canal Inferior de ${tag}`,
                                    data: lowerChannel,
                                    borderColor: 'rgba(0, 0, 255, 1)',
                                    fill: false,
                                }
                            ];

                            return (
                                <div key={tag} className="mt-1"  style={{ display: 'inline-block', width: '100%' }}>
                                    <label className='fw-bold'>{`Gráfico para el tag: ${tag}`}</label>
                                    <div className="chart-container mt-3" style={{ width: '100%' }}>
                                        <Line
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
                <div><h4 className='mt-3 fw-bold'>Serie Temporal</h4></div>
                <div className="my-1">
                    <label htmlFor="windowSize">Tamaño de la ventana de la media móvil:</label>
                    <input
                        type="number"
                        id="windowSize"
                        value={windowSize}
                        onChange={(e) => setWindowSize(Math.max(1, e.target.value))}
                        style={{ marginLeft: '10px', width: '60px' }}
                    />
                </div>

                {Object.keys(data).length === 0 ? (
                    <p>Cargando datos...</p>
                ) : (
                    renderLineCharts()  // Renderizar múltiples gráficos
                )}
            </div>
        </div>
    );
};

export default LineChart;
