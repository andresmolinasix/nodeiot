import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HeaderTres } from '.';

const SensorForm = () => {
  const [nombreTrama, setNombreTrama] = useState('');
  const [sensors, setSensors] = useState([
    {
      id: '',
      unidades: '',
      descripcion: '',
      host: '',
      puerto: '',
      longitud: '',
      latitud: '',
    },
  ]);
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito
  const [redirectPath, setRedirectPath] = useState('/dashboard'); // Estado para la ruta de redirección
  const navigate = useNavigate();

  const handleCrearTrama = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    try {
      const datosSensores = sensors.map((sensor) => ({
        Tag: sensor.id,
        Unidades: sensor.unidades,
        Descripcion: sensor.descripcion,
        Host: sensor.host,
        Puerto: sensor.puerto,
        Longitud: sensor.longitud,
        Latitud: sensor.latitud,
      }));

      const response = await axios.post('http://localhost:3004/crearTabla', {
        nombreTrama,
        datos: datosSensores,
      });

      console.log(response.data);
      setSuccessMessage(`Tabla ${nombreTrama} creada y datos insertados exitosamente.`); // Establecer el mensaje de éxito

      // Puedes cambiar la ruta aquí si lo deseas
      setRedirectPath('/otraRuta'); // Cambiar la ruta de redirección según sea necesario

      // Navegar después de un breve retraso
      setTimeout(() => {
        navigate(redirectPath);
      }, 2000); // Esperar 2 segundos antes de navegar
    } catch (error) {
      console.error('Error al crear la trama:', error);
      // Aquí puedes manejar el error si es necesario
    }
  };

  const handleCancelar = () => {
    navigate('/home');
  };

  const addSensor = () => {
    setSensors([
      ...sensors,
      {
        id: '',
        unidades: '',
        descripcion: '',
        host: '',
        puerto: '',
        longitud: '',
        latitud: '',
      },
    ]);
  };

  const removeSensor = (index) => {
    setSensors(sensors.filter((_, i) => i !== index));
  };

  const handleChange = (index, event) => {
    const newSensors = sensors.map((sensor, i) => {
      if (i === index) {
        return { ...sensor, [event.target.name]: event.target.value };
      }
      return sensor;
    });
    setSensors(newSensors);
  };

  const handleNombreTramaChange = (event) => {
    setNombreTrama(event.target.value);
  };

  return (
    <div>
      <HeaderTres />
      <div className="container d-flex justify-content-center align-items-center mt-3">
        <div className="card-body">
          <h5 className="card-title fw-bold">Ingrese el nombre de la trama</h5>
          <form onSubmit={handleCrearTrama}>
            <div className="form-group mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Ej: Acueducto_Tunja"
                value={nombreTrama}
                onChange={handleNombreTramaChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-enter mt-2">
              Crear
            </button>
            <button
              type="button"
              className="btn btn-salirD mt-2 mx-3 text-black"
              onClick={handleCancelar}
            >
              Cancelar
            </button>
          </form>
          {successMessage && ( // Mostrar el mensaje de éxito
            <div className="alert alert-success mt-3" role="alert">
              {successMessage}
            </div>
          )}
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center mt-3">
        <div className="card p-1">
          <h2 className="text-center mb-4">Cluster de Sensores</h2>
          {sensors.map((sensor, index) => (
            <div key={index} className="d-flex flex-row align-items-center mb-4">
              {['id', 'unidades', 'descripcion', 'host', 'puerto', 'longitud', 'latitud'].map((field, i) => (
                <div key={i} className="form-group mx-2">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    className="form-control"
                    name={field}
                    value={sensor[field]}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              ))}
              {sensors.length > 1 && (
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => removeSensor(index)}
                >
                  <span className="material-icons">remove_circle</span>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-enter d-flex justify-content-center align-items-center"
            onClick={addSensor}
          >
            <span className="material-icons">add</span>
            Agregar nuevo sensor
          </button>
        </div>
      </div>
    </div>
  );
};

export default SensorForm;
