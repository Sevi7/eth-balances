import { formatNumber } from '#utils';
import Decimal from 'decimal.js';

Decimal.set({ toExpNeg: -20, toExpPos: 20 });

describe('format number with minimum significant figures, minimum digital places(although not showing them if not required), rounding up decimal part, removing trailing zeros and adding thousands separators', () => {
  it('should format number with many insignificant leading 0 in a decimal number', () => {
    expect(
      formatNumber({ number: '0.000000123456789', minSignificantFigures: 4, minDecimalPlaces: 2 }),
    ).toEqual('0.0000001235');
  });
  it('should format number with 1 insignificant leading 0 in a decimal number', () => {
    expect(
      formatNumber({ number: '0.123456789000000', minSignificantFigures: 4, minDecimalPlaces: 2 }),
    ).toEqual('0.1235');
  });
  it('should format number with 1 significant figure in the whole part', () => {
    expect(
      formatNumber({ number: '1.234567890000000', minSignificantFigures: 4, minDecimalPlaces: 2 }),
    ).toEqual('1.235');
  });
  it('should format number with 2 significant figures in the whole part', () => {
    expect(
      formatNumber({ number: '12.34567890000000', minSignificantFigures: 4, minDecimalPlaces: 2 }),
    ).toEqual('12.35');
  });
  it('should format number with 3 significant figures in the whole part', () => {
    expect(
      formatNumber({ number: '123.4567890000000', minSignificantFigures: 4, minDecimalPlaces: 2 }),
    ).toEqual('123.46');
  });
  it('should format number with 4 significant figures in the whole part', () => {
    expect(
      formatNumber({ number: '1234.567890000000', minSignificantFigures: 4, minDecimalPlaces: 2 }),
    ).toEqual('1,234.57');
  });
  it('should format number with many zeros between two significant figures in the decimal part', () => {
    expect(
      formatNumber({ number: '1.200000000000001', minSignificantFigures: 4, minDecimalPlaces: 2 }),
    ).toEqual('1.2');
  });
  it('should format number with many zeros between two significant figures', () => {
    expect(
      formatNumber({ number: '1.000000000000001', minSignificantFigures: 4, minDecimalPlaces: 2 }),
    ).toEqual('1');
  });
  it('should format number with thousands operator and many trailing zeros', () => {
    expect(
      formatNumber({ number: '123456789.000000', minSignificantFigures: 4, minDecimalPlaces: 2 }),
    ).toEqual('123,456,789');
  });
});
