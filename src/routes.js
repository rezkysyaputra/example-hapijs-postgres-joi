import {
  addBarangHandler,
  getAllBarangHandler,
  editBarangHandler,
  deleteBarangHandler,
} from './handler.js';

export const routes = [
  {
    method: 'POST',
    path: '/barang',
    handler: addBarangHandler,
  },
  {
    method: 'GET',
    path: '/barang',
    handler: getAllBarangHandler,
  },
  {
    method: 'PUT',
    path: '/barang/{kodeBarang}',
    handler: editBarangHandler,
  },
  {
    method: 'DELETE',
    path: '/barang/{kodeBarang}',
    handler: deleteBarangHandler,
  },
];
