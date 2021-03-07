const mongoose = require('mongoose');
const request = require('supertest');
const { dbConnection } = require('../../database/config');
const Ingredient = require('../../models/Ingredient');
const app = require('../../app');

beforeAll(async () => {
  await dbConnection().then();
});

afterAll(async () => {
  await mongoose.connection.db.dropCollection('ingredients');
  mongoose.disconnect();
});

describe('Test con la API ingredients', () => {
  describe('PUT', () => {
    test('Debe crear el ingrediente', async () => {
      const response = await request(app)
        .put('/api/ingredients')
        .field('name', 'Ingredient put');

      const {
        ingredient: { name },
      } = JSON.parse(response.text);

      expect(name).toBe('Ingredient put');
      expect(response.status).toBe(201);
    });

    test('Debe dar error si falta el nombre', async () => {
      const response = await request(app)
        .put('/api/ingredients');

      expect(response.status).toBe(400);
    });
  });

  describe('POST', () => {
    test('Debe modificar el ingrediente', async () => {
      const { _id: id } = await new Ingredient({ name: 'IngredienteUpdate' }).save();

      const response = await request(app).post('/api/ingredients').field('id', String(id)).field('name', 'IngredienteUpdate2');

      const { ingredient: { name } } = JSON.parse(response.text);

      expect(response.status).toBe(200);
      expect(name).toBe('IngredienteUpdate2');
    });
  });

  describe('DELETE', () => {
    test('Debe eliminar el ingrediente', async () => {
      const { _id: id } = await new Ingredient({ name: 'IngredienteUpdate' }).save();

      const response = await request(app).delete(`/api/ingredients/${id}`);

      expect(response.status).toBe(200);
    });
  });

  describe('GET', () => {
    test('Debe consultar el ingrediente', async () => {
      await new Ingredient({ name: 'IngredienteGet' }).save();

      const response = await request(app).get('/api/ingredients');

      const { ingredients } = JSON.parse(response.text);

      expect(response.status).toBe(200);
      expect(ingredients.length).toBeGreaterThanOrEqual(1);
    });
  });
});
