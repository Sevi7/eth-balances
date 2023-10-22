import type { CustomFastifyInstance } from '../../app';
import Errors from '../../errors';
import HttpStatusCode from '../../enums/HttpStatusCode';
import schema from './schema';
import { UseCase, type IDto } from './UseCase';

const controller = async (app: CustomFastifyInstance) =>
  app.get(
    '/eth/balances',
    {
      schema,
    },
    async (request, reply) => {
      try {
        const dto: IDto = {
          addresses: request.query.address,
        };
        const response = await new UseCase(app.ethersProvider).execute(dto);
        return await reply.code(HttpStatusCode.OK).send(response);
      } catch (error: unknown) {
        app.log.error(error);
        return reply.code(Errors.InternalServerError.statusCode).send(Errors.InternalServerError);
      }
    },
  );

export default controller;
