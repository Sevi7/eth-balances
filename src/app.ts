import { fastify } from 'fastify';

const app = fastify({
  logger: true,
});

app.get('/health', async (_, reply) => reply.code(200).send({ status: 'ok' }));

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
