import { addThousandsSeparator } from '#utils';

describe('addThousandsSeparator', () => {
  it('should add a comma as separator in whole number', () => {
    expect(
      addThousandsSeparator({ number: '1234', decimalSeparator: '.', thousandsSeparator: ',' }),
    ).toEqual('1,234');
  });
  it('should add a comma as separator in decimal number', () => {
    expect(
      addThousandsSeparator({ number: '1234.12', decimalSeparator: '.', thousandsSeparator: ',' }),
    ).toEqual('1,234.12');
  });
  it('should add a dot as separator in whole number', () => {
    expect(
      addThousandsSeparator({ number: '1234', decimalSeparator: ',', thousandsSeparator: '.' }),
    ).toEqual('1.234');
  });
  it('should add a dot as separator in decimal number', () => {
    expect(
      addThousandsSeparator({ number: '1234,12', decimalSeparator: ',', thousandsSeparator: '.' }),
    ).toEqual('1.234,12');
  });
  it('should throw an error when decimal and thousands separators are the same', () => {
    expect(() =>
      addThousandsSeparator({ number: '1234.12', decimalSeparator: '.', thousandsSeparator: '.' }),
    ).toThrow('Thousands separator cannot be the same as decimal separator');
  });
  it('should add 1 separators', () => {
    expect(
      addThousandsSeparator({ number: '1234', decimalSeparator: '.', thousandsSeparator: ',' }),
    ).toEqual('1,234');
  });
  it('should add 2 separators', () => {
    expect(
      addThousandsSeparator({
        number: '123456789',
        decimalSeparator: '.',
        thousandsSeparator: ',',
      }),
    ).toEqual('123,456,789');
  });
  it('should add 3 separators', () => {
    expect(
      addThousandsSeparator({
        number: '1234567890',
        decimalSeparator: '.',
        thousandsSeparator: ',',
      }),
    ).toEqual('1,234,567,890');
  });
  it('should not add separators in the decimal part', () => {
    expect(
      addThousandsSeparator({
        number: '1234.567890',
        decimalSeparator: '.',
        thousandsSeparator: ',',
      }),
    ).toEqual('1,234.567890');
  });
});
