import { type Provider, isAddress, formatEther } from 'ethers';
import type IUseCase from '../../types/IUseCase';
import { formatNumber } from '../../utils';

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
      const formattedBalance = formatNumber({
        number: etherBalance,
        minSignificantFigures: 4,
        minDecimalPlaces: 2,
      });
      return formattedBalance;
    });

    const balances = await Promise.all(balancePromises);

    const balancesObject = addresses.reduce<Record<string, string>>((acc, address, index) => {
      acc[address] = balances[index];
      return acc;
    }, {});

    return balancesObject;
  }
}
