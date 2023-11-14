import { nanoid } from 'nanoid';
import { client } from './server.js';
import { validationBarang } from './validation.js';

// POST
export const addBarangHandler = async (request, h) => {
  const { nama, harga, jumlah } = request.payload;

  // Validation Joi
  try {
    await validationBarang.validateAsync({ nama, harga, jumlah });
  } catch (err) {
    console.error('Validation error:', err);
    return h.response({ error: 'Bad Request' }).code(400);
  }

  const kode = nanoid(4);
  const query =
    'INSERT INTO barang(kode, nama, harga, jumlah) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [kode, nama, harga, jumlah];

  try {
    const result = await client.query(query, values);
    console.log('Barang ditambahkan:', result.rows[0]);
    return h.response(result.rows[0]).code(201);
  } catch (err) {
    console.error('Error menambahkan barang:', err);
    return h.response({ error: 'Internal Server Error' }).code(500);
  }
};

// GET ALL
export const getAllBarangHandler = async (request, h) => {
  const query = 'SELECT * FROM barang';
  try {
    const result = await client.query(query);
    console.log('Menampilkan semua barang:', result.rows);
    return h.response(result.rows).code(200);
  } catch (err) {
    console.error('Error menampilkan semua barang:', err);
    return h.response({ error: 'Internal Server Error' }).code(500);
  }
};

// UPDATE
export const editBarangHandler = async (request, h) => {
  const { kodeBarang } = request.params;
  const { nama, harga, jumlah } = request.payload;

  // Validation Joi
  try {
    await validationBarang.validateAsync({ nama, harga, jumlah });
  } catch (err) {
    console.error('Validation error:', err);
    return h.response({ error: 'Bad Request' }).code(400);
  }

  const query =
    'UPDATE barang SET nama = $2, harga = $3, jumlah = $4 WHERE kode = $1 RETURNING *';
  const values = [kodeBarang, nama, harga, jumlah];
  try {
    const result = await client.query(query, values);
    console.log('Barang updated:', result.rows[0]);
    return h.response(result.rows).code(200);
  } catch (err) {
    console.error('Error updating barang:', err);
    return h.response({ error: 'Internal Server Error' }).code(500);
  }
};

// DELETE
export const deleteBarangHandler = async (request, h) => {
  const { kodeBarang } = request.params;

  const query = 'DELETE FROM barang WHERE kode = $1 RETURNING *';
  const values = [kodeBarang];

  try {
    const result = await client.query(query, values);
    console.log('Barang deleted:', result.rows);
    return h.response(result.rows).code(200);
  } catch (err) {
    console.error('Error deleting barang:', err);
    return h.response({ error: 'Internal Server Error' }).code(500);
  }
};
