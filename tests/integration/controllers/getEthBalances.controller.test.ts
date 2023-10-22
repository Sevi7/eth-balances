import fp from 'fastify-plugin';
import type { fastify } from 'fastify';
import { buildApp, type CustomFastifyInstance } from '../../../src/app';
import { Provider } from 'ethers';

const getBalanceMock = jest.fn();

const ethersProviderMock = {
  getBalance: getBalanceMock,
} as unknown as Provider;

jest.mock('../../../src/plugins/ethersProvider', () =>
  fp(async (app: CustomFastifyInstance) => {
    app.decorate('ethersProvider', ethersProviderMock);
  }),
);

let app: Awaited<ReturnType<typeof fastify>>;

beforeAll(() => {
  app = buildApp();
});

afterAll(() => {
  app.close();
});

describe('get ethereum balances Controller', () => {
  it('should return bad request response if no address is sent in query string parameters', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/eth/balances',
    });

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.payload || '')).toEqual({
      statusCode: 400,
      code: 'FST_ERR_VALIDATION',
      error: 'Bad Request',
      message: "querystring must have required property 'address'",
    });
  });

  it('should return bad request response if more than 20 addresses are sent in query string parameters', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/eth/balances',
      query: {
        address: Array(25),
      },
    });

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.payload || '')).toEqual({
      statusCode: 400,
      code: 'FST_ERR_VALIDATION',
      error: 'Bad Request',
      message: 'querystring/address must NOT have more than 20 items',
    });
  });

  it('should return ethereum balances in human readable format', async () => {
    getBalanceMock.mockResolvedValueOnce(935143006844486974073n);
    getBalanceMock.mockResolvedValueOnce(7020781028105483n);
    const res = await app.inject({
      method: 'GET',
      url: '/eth/balances',
      query: {
        address: [
          '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
          '0xedf37e7fc70a97c5d1752cd909e0183b5bd23b27',
          'invalid-address',
        ],
      },
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload || '')).toEqual({
      '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045': '935.14',
      '0xedf37e7fc70a97c5d1752cd909e0183b5bd23b27': '0.007021',
      'invalid-address': '0',
    });
  });
});
