const mongoose = require('mongoose');
const Console = require('Console');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    Console.success('Conectado a MongoDB');
  } catch (error) {
    Console.error(error);
    throw new Error('Error al conectar a la base de datos');
  }
};

module.exports = {
  dbConnection,
};
