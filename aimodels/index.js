// index.js
const app = require('./network');

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`Microservicio de modelos corriendo en el puerto ${PORT}`);
});
