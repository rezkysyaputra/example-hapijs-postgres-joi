import pkg from '@hapi/hapi';
import pg from 'pg';
import { routes } from './routes.js';

const Hapi = pkg;
const { Client } = pg;

const server = Hapi.server({
  port: 9000,
  host: 'localhost',
});

export const client = new Client({
  user: 'rezky',
  host: 'localhost',
  database: 'gudang',
  password: 'admin',
  port: 5432,
});

const init = async () => {
  await server.start();
  console.log(`Server running on ${server.info.uri}`);

  server.route(routes);

  await client.connect();
  console.log('Connected to PostgreSQL');
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
