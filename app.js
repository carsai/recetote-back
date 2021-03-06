const express = require('express');
require('dotenv').config({ path: (process.env.NODE_ENV) ? `.env.${process.env.NODE_ENV}` : '.env' });
const multer = require('multer');
const { noApi } = require('./controller/otros');

// Inicializando
const app = express();
const upload = multer();

// Parser de body
app.use(express.json());
app.use(upload.any());

// Routers
app.use('/api', require('./routers/index'));

// En caso de API inexistente
app.use(noApi);

module.exports = app;
