import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define tus puntos con coordenadas y colores
const puntos = {
    // empresa_de_energia
    empresa_de_energia: [
        { nombre: 'MQTT_BAQ_EMCP_1_Gas_Flow_G1', latitud: 4.683508119795038, longitud: -74.270349229254, color: 'red' },
        { nombre: 'MQTT_BAQ_EMCP_1_engine_oil_press', latitud: 4.683490797705744, longitud: -74.27085904617708, color: 'red' },
        { nombre: 'MQTT_BAQ_EMCP_1_exhaust_nox', latitud: 4.6843280315312965, longitud: -74.27085325280295, color: 'red' },
        { nombre: 'HINTER_CAR_CH1_COND_OUT_TEMP', latitud: 4.68462800300652, longitud: -74.27034985543402, color: 'red' },
        { nombre: 'HINTER_CAR_CH1_REF_SUCT_TEMP', latitud: 4.685162652521994, longitud: -74.27013527871853, color: 'red' }
    ],

    // acueducto_tunja
    acueducto_tunja: [
        { nombre: 'SECTOR_28_COCA_COLA_PATEC_1300_CAUDAL', latitud: 5.508357007543988, longitud: -73.35855275932656, color: 'blue' },
        { nombre: 'SECTOR_1_STA_CATALINA_PATEC_491_CAUDAL', latitud: 5.570384471108302, longitud: -73.33610191134574, color: 'blue' },
        { nombre: 'SECTOR_17_COLEG_BOYACA_PATEC607_CAUDAL', latitud: 5.422193051525852, longitud: -73.54224583525628, color: 'blue' },
        { nombre: 'SECTOR_11_EL_RECREO_PATEC_527_Flow', latitud: 5.550396228310264, longitud: -73.35381364056884, color: 'blue' },
        { nombre: 'SECTOR_11_EL_RECREO_PATEC_527_CAUDAL', latitud: 5.550396228310264, longitud: -73.35381364056884, color: 'blue' }
    ],

    // acueducto_menteria
    acueducto_menteria: [
        { nombre: 'MON_ZONA4_CAP4_CAUDAL', latitud: 8.803627881416892, longitud: -75.85798843493792, color: 'green' },
        { nombre: 'MON_ZONA4_CAP4_Flow', latitud: 8.79209225113216, longitud: -75.86554153532342, color: 'green' },
        { nombre: 'MON_ZONA4_SECTOR101_RGRANDE_CAUDAL', latitud: 8.757504406061015, longitud: -75.88681031612667, color: 'green' },
        { nombre: 'MON_ZONA5_PTAPIGUANAS1_CAUDAL', latitud: 8.788932288103078, longitud: -75.86598947713006, color: 'green' }
    ]
};

const MapComponent = ({ nombreTabla }) => {
    const [coordenadas, setCoordenadas] = useState([]);
    const mapRef = React.useRef(null);  // Usar ref para almacenar la instancia del mapa

    useEffect(() => {
        const fetchCoordenadas = async () => {
            if (nombreTabla) {  // Solo hacer la petición si nombreTabla tiene valor
                try {
                    const response = await fetch(`http://localhost:3000/api/map/coordenadas/${nombreTabla}`);
                    if (!response.ok) {
                        throw new Error('Error al obtener las coordenadas');
                    }
                    const data = await response.json();
                    setCoordenadas(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchCoordenadas();
    }, [nombreTabla]);  // Se vuelve a ejecutar cuando nombreTabla cambia

    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current;

            // Limpiar los marcadores existentes antes de agregar nuevos
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
                    map.removeLayer(layer);
                }
            });

            // Agregar nuevos marcadores y centrarlos
            const bounds = [];
            // Agregar coordenadas del API
            coordenadas.forEach(coord => {
                const latitud = parseFloat(coord.latitud);
                const longitud = parseFloat(coord.longitud);
                const marker = L.marker([latitud, longitud]).addTo(map);
                bounds.push([latitud, longitud]);  // Agregar coordenada a bounds
            });

            // Agregar los nuevos puntos desde la variable puntos
            Object.values(puntos).flat().forEach(punto => {
                const marker = L.circleMarker([punto.latitud, punto.longitud], {
                    color: punto.color,
                    radius: 8, // Ajustar el tamaño del marcador
                    fillOpacity: 1,
                }).addTo(map);
                bounds.push([punto.latitud, punto.longitud]);  // Agregar coordenada a bounds
            });

            if (bounds.length > 0) {
                const latLngBounds = L.latLngBounds(bounds);  // Crear un conjunto de límites (bounds)
                map.fitBounds(latLngBounds);  // Centrar el mapa para que todos los puntos sean visibles
            }
        } else {
            // Inicializar el mapa si no está inicializado
            mapRef.current = L.map('dashboard-map').setView([4.6109, -74.0818], 12); // Vista inicial en Bogotá, Colombia

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(mapRef.current);
        }
    }, [coordenadas]);

    return (
        <div id="dashboard-map" style={{ height: '400px', width: '100%' }}></div>
    );
};

export default MapComponent;
