const request = require('supertest');
const mongoose = require('mongoose');
const Category = require('../../models/Category');
const app = require('../../app');
const { dbConnection } = require('../../database/config');

beforeAll(async () => {
  await dbConnection().then();
});

afterAll(async () => {
  await mongoose.connection.db.dropCollection('categories');
  mongoose.disconnect();
});

describe('Tests con la API categories', () => {
  describe('PUT', () => {
    test('Debe crear la categoría sin imagen', async () => {
      const response = await request(app)
        .put('/api/categories')
        .field('name', 'jestTest');

      const {
        category: { name },
      } = JSON.parse(response.text);

      expect(name).toBe('JESTTEST');
      expect(response.status).toBe(201);
    });

    test('Debe crear la categoría con imagen', async () => {
      const response = await request(app)
        .put('/api/categories')
        .field('name', 'jestTestImg')
        .attach('img', 'tests/files/image.png');

      const {
        category: { name },
      } = JSON.parse(response.text);

      expect(name).toBe('jestTestImg'.toUpperCase());
      expect(response.status).toBe(201);
    });

    test('Debe dar error si falta el campo name', async () => {
      const response = await request(app)
        .put('/api/categories');

      expect(response.status).toBe(400);
    });

    test('Debe dar error si el fichero es erróneo', async () => {
      const response = await request(app)
        .put('/api/categories')
        .field('name', 'jestTest')
        .attach('img', 'tests/files/no_image.txt');

      expect(response.status).toBe(400);
    });

    test('Debe dar error si la categoría ya existe', async () => {
      await new Category({ name: 'EXISTE' }).save();
      const response = await request(app)
        .put('/api/categories')
        .field('name', 'EXISTE');

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE', () => {
    test('Debe borrar la categoría', async () => {
      const category = await new Category({ name: 'jestDelete' }).save();

      const { _id: id } = category;

      const response = await request(app).delete(`/api/categories/${id}`);

      const { ok } = JSON.parse(response.text);

      expect(ok).toBe(true);
      expect(response.status).toBe(200);
    });
  });

  describe('POST', () => {
    test('Debe actualizar la categoría', async () => {
      const category = await new Category({ name: 'jestPost' }).save();

      const { _id: id } = category;

      const response = await request(app)
        .post('/api/categories')
        .field('id', String(id))
        .field('name', 'jestUpdate2');

      const {
        category: { name },
      } = JSON.parse(response.text);

      expect(name).toBe('jestUpdate2'.toUpperCase());
      expect(response.status).toBe(200);
    });

    test('Debe dar error si la imagen no es valida', async () => {
      const category = await new Category({ name: 'IMAGEN_MAL' }).save();

      const { _id: id } = category;

      const response = await request(app)
        .put('/api/categories')
        .field('id', String(id))
        .field('name', 'IMAGEN_MAL')
        .attach('img', 'tests/files/no_image.txt');

      expect(response.status).toBe(400);
    });

    test('Debe dar error si la categoría ya existe', async () => {
      await new Category({ name: 'EXISTE_POST1' }).save();
      const category = await new Category({ name: 'EXISTE_POST2' }).save();

      const { _id: id } = category;

      const response = await request(app)
        .put('/api/categories')
        .field('id', String(id))
        .field('name', 'EXISTE_POST1');

      expect(response.status).toBe(400);
    });
  });

  describe('GET', () => {
    test('Debe mostrar la categoría', async () => {
      await new Category({ name: 'jestGet' }).save();

      const response = await request(app).get('/api/categories');

      const { categories } = JSON.parse(response.text);

      expect(categories.length).toBeGreaterThanOrEqual(1);
      expect(response.status).toBe(200);
    });
  });
});
