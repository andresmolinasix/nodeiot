const pool = require('../services/mysqlService');

const getLineChartData = async (req, res) => {
  try {
    const { tag } = req.query; // Obtener el tag desde los query parameters

    // Si no se proporciona un tag, devolver un error
    if (!tag) {
      return res.status(400).json({ error: 'Debe proporcionar un tag para filtrar los datos' });
    }

    // Consultar solo los datos del tag proporcionado
    const [rows] = await pool.query('SELECT tag, Value, Moment FROM data WHERE tag = ?', [tag]);

    // Organizar los datos por tag
    const lineChartData = {
      moments: [],
      values: []
    };

    rows.forEach(row => {
      lineChartData.moments.push(row.Moment);
      lineChartData.values.push(row.Value);
    });

    // Devolver los datos filtrados
    res.json(lineChartData);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

module.exports = { getLineChartData };
