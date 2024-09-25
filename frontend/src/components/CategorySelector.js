const CategorySelector = ({ categoryC }) => {  
    console.log("epaa", typeof(categoryC));

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
  
    const points = categoryTags[categoryC]; // Obtener los puntos asociados
  
    if (!points) {
      return <div>No se encontraron puntos para la categoría seleccionada.</div>;
    }

    return (
      <div className="my-3">
        <div className="mt-3">
          <h4 className="mx-3 fw-bold">Puntos asociados a {categoryC}:</h4>
          <ul>
            {points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    );
};
  
export default CategorySelector;
