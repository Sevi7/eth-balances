import fp from 'fastify-plugin';
import { AlchemyProvider } from 'ethers';
import type { CustomFastifyInstance } from '../app';

const ethersProvider = fp(async (app: CustomFastifyInstance) => {
  const provider = new AlchemyProvider(
    app.environments.ethereumNetwork,
    app.environments.ethersApiKey,
  );
  app.decorate('ethersProvider', provider);
});

export default ethersProvider;
