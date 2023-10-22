import IUseCase from '#types/IUseCase';
import { type Provider, isAddress, formatEther } from 'ethers';

export interface IDto {
  addresses: string[];
}

export type Response = Record<string, string>;

export class UseCase implements IUseCase<IDto, Response> {
  constructor(private _ethersProvider: Provider) {}

  async execute({ addresses }: IDto) {
    const balancePromises = addresses.map(async (address) => {
      if (!isAddress(address)) {
        return '0';
      }
      const weiBalance = await this._ethersProvider.getBalance(address);
      const etherBalance = formatEther(weiBalance);
      return etherBalance;
    });

    const balances = await Promise.all(balancePromises);

    const balancesObject = addresses.reduce<Record<string, string>>((acc, address, index) => {
      acc[address] = balances[index];
      return acc;
    }, {});

    return balancesObject;
  }
}
