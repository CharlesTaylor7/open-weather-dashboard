import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';

const fastify = Fastify({
  logger: true,
});

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../',
  'public',
);
fastify.register(FastifyStatic, { root });

fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
});

fastify.get('/open-weather-dashboard', (request, reply) => {
  reply.sendFile('index.html');
});

const port: number = Number(process.env.PORT);

fastify.listen({ port, host: '0.0.0.0' }, function (error, address) {
  if (error) {
    fastify.log.error(error);
    return;
  }
  console.log(`Weather Dashboard API running at ${address}`);
});
