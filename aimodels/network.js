// network.js
const express = require('express');
const cors = require('cors');
const { getHistogramData } = require('./controllers/histogramController');
const { getLineChartData } = require('./controllers/lineChartController'); 

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/histograms', getHistogramData);
app.get('/api/linecharts', getLineChartData); 

module.exports = app;
