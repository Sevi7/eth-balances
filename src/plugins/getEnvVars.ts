import fp from 'fastify-plugin';
import { get as getEnvVar } from 'env-var';
import type { CustomFastifyInstance } from '#app';

const getEnvVars = (environments: Record<string, string>) =>
  fp(async (app: CustomFastifyInstance) => {
    const values = Object.entries(environments).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: getEnvVar(value).required().asString(),
      }),
      {} as Readonly<Record<string, string>>,
    );

    app.decorate('environments', {
      getter() {
        return values;
      },
    });
  });

export default getEnvVars;
