const pool = require('../services/mysqlService');

const getHistogramData = async (req, res) => {
  try {
    // Realizar la consulta a la base de datos
    const [rows] = await pool.query('SELECT tag, Value FROM data');

    // Organizar los datos en un formato adecuado para los histogramas
    const histogramData = rows.reduce((acc, row) => {
      if (!acc[row.tag]) {
        acc[row.tag] = [];
      }
      acc[row.tag].push(row.Value);
      return acc;
    }, {});

    // Enviar los datos al frontend en formato JSON
    res.json(histogramData);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

module.exports = { getHistogramData };
