import { UseCase } from '../../../src/routes/getEthBalances/UseCase';
import { Provider } from 'ethers';

const getBalanceMock = jest.fn();

const ethersProviderMock = {
  getBalance: getBalanceMock,
} as unknown as Provider;

describe('get ethereum balances Use Case', () => {
  const useCase = new UseCase(ethersProviderMock);

  it('should return 0 as balance for not valid ethereum address', async () => {
    const response = await useCase.execute({
      addresses: ['not-a-valid-eth-address'],
    });
    expect(response).toEqual({
      'not-a-valid-eth-address': '0',
    });
  });

  it('should retrieve and format balance in a human-readable way', async () => {
    getBalanceMock.mockResolvedValue(935143006844486974073n);
    const response = await useCase.execute({
      addresses: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'],
    });
    expect(response).toEqual({
      '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045': '935.14',
    });
  });

  it('should retrieve and format balance in a human-readable way multiple addresses', async () => {
    getBalanceMock.mockResolvedValueOnce(935143006844486974073n);
    getBalanceMock.mockResolvedValueOnce(7020781028105483n);
    const response = await useCase.execute({
      addresses: [
        '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        '0xedf37e7fc70a97c5d1752cd909e0183b5bd23b27',
        'invalid-address',
      ],
    });
    expect(response).toEqual({
      '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045': '935.14',
      '0xedf37e7fc70a97c5d1752cd909e0183b5bd23b27': '0.007021',
      'invalid-address': '0',
    });
  });
});
