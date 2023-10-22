import type {
  FastifyBaseLogger,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { fastify, FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';
import fastifyResponseValidation from '@fastify/response-validation';
import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import type { Provider } from 'ethers';
import ethersProvider from '#plugins/ethersProvider';
import getEnvVars from '#plugins/getEnvVars';
import getEthBalances from '#routes/getEthBalances/controller';
import Decimal from 'decimal.js';

const environments = {
  ethereumNetwork: 'ETHEREUM_NETWORK',
  ethersApiKey: 'ETHERS_API_KEY',
};

export interface CustomFastifyInstance
  extends FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    JsonSchemaToTsProvider
  > {}

declare module 'fastify' {
  interface FastifyInstance {
    ethersProvider: Readonly<Provider>;
    environments: Readonly<Record<keyof typeof environments, string>>;
  }
}

Decimal.set({ toExpNeg: -20, toExpPos: 20 });

const app = fastify({
  logger: true,
}).withTypeProvider<JsonSchemaToTsProvider>();

// plugins
app.register(helmet);
app.register(fastifyResponseValidation);
app.register(getEnvVars(environments));
app.register(ethersProvider);

// routes
app.get('/health', async (_, reply) => reply.code(200).send({ status: 'ok' }));
app.register(getEthBalances);

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
