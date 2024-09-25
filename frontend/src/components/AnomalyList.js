import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnomalyList = ({ categoryC }) => {
    console.log('2', categoryC)
    const [anomalies, setAnomalies] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');

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

    // Fetch de los datos desde el backend
    useEffect(() => {
        axios.get('http://localhost:4002/api/linecharts')
            .then(response => {
                console.log('Datos recibidos:', response.data);
                findAnomalies(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos', error);
            });
    }, []);

    // Calcular los canales y encontrar anomalías
    const calculateChannels = (values) => {
        const upperChannel = [];

        for (let i = 0; i < values.length; i++) {
            if (i >= 6) { // Considerando una ventana de 7
                const windowValues = values.slice(i - 6, i + 1);
                const avg = windowValues.reduce((a, b) => a + b, 0) / windowValues.length;
                const variance = windowValues.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / windowValues.length;
                const stdDevValue = Math.sqrt(variance);
                upperChannel.push(avg + 2 * stdDevValue);
            } else {
                upperChannel.push(null);
            }
        }

        return upperChannel;
    };

    // Función para encontrar anomalías en los datos
    const findAnomalies = (data) => {
        const anomaliesByCategory = {};

        Object.keys(data).forEach(tag => {
            const values = data[tag].values || [];
            const moments = data[tag].moments || [];

            if (values.length > 0 && moments.length > 0) {
                const upperChannel = calculateChannels(values);
                const mean = values.reduce((a, b) => a + b, 0) / values.length;
                const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
                const stdDevValue = Math.sqrt(variance);

                upperChannel.forEach((threshold, index) => {
                    if (threshold !== null && values[index] > threshold) {
                        // Cálculo de la cantidad de desviaciones estándar
                        const deviationsFromMean = ((values[index] - mean) / stdDevValue).toFixed(2);
                        if (!anomaliesByCategory[tag]) {
                            anomaliesByCategory[tag] = [];
                        }
                        anomaliesByCategory[tag].push({
                            moment: moments[index],
                            value: values[index],
                            deviations: deviationsFromMean
                        });
                    }
                });
            }
        });

        setAnomalies(anomaliesByCategory);
    };

    // Renderizar las anomalías encontradas
    const renderAnomalies = () => {
        if (!categoryC) return null; // Si no hay categoría seleccionada, no renderiza nada

        const tagsToRender = categoryTags[categoryC] || [];

        return tagsToRender.map(tag => {
            const anomaliesForTag = anomalies[tag];
            if (!anomaliesForTag || anomaliesForTag.length === 0) return null;

            return (
                <div key={tag}>
                    <p><strong>Anomalías para {tag}</strong>:</p>
                    <ul>
                        {anomaliesForTag.map((anomaly, index) => (
                            <li key={index}>
                                <div>Tiempo: {anomaly.moment}</div>
                                <div><strong>Valor: {anomaly.value}</strong></div>
                                <div>Desviaciones: {anomaly.deviations}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        });
    };

    return (
        <div>
            <h4 className='mt-3 fw-bold'>Lista de Anomalías Detectadas</h4>
            {/* Dropdown para seleccionar la categoría */}

            {renderAnomalies()}
        </div>
    );
};

export default AnomalyList;
