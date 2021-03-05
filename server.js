const app = require('./app')

app.listen(process.env.PUERTO, () => {
  console.log(`Iniciando en puerto ${process.env.PUERTO}`)
})
