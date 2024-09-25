// controllers/lineChartController.js
const pool = require('../services/mysqlService');

const getLineChartData = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT tag, Value, Moment FROM data');

    // Organizar los datos por tag
    const lineChartData = rows.reduce((acc, row) => {
      if (!acc[row.tag]) {
        acc[row.tag] = { moments: [], values: [] };
      }
      acc[row.tag].moments.push(row.Moment);
      acc[row.tag].values.push(row.Value);
      return acc;
    }, {});

    res.json(lineChartData);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

module.exports = { getLineChartData };
