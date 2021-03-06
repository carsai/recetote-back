const Console = require('Console');
const app = require('./app');
const { dbConnection } = require('./database/config');

dbConnection().then();

// Inicio del servidor
app.listen(process.env.PUERTO, () => {
  Console.success(`Iniciando en puerto ${process.env.PUERTO}`);
});
