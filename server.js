const Console = require('Console');
const app = require('./app');

// Inicio del servidor
app.listen(process.env.PUERTO, () => {
  Console.success(`Iniciando en puerto ${process.env.PUERTO}`);
});
