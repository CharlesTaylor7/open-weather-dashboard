import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

async function main() {
  try {
    await fastify.listen({ port: process.env.PORT, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
  }
}
main();
