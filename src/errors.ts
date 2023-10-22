import HttpStatusCode from './enums/HttpStatusCode';

const Errors = {
  InternalServerError: {
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal Server Error',
  },
} as const;

export default Errors;
