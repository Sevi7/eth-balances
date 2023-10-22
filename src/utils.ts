import Decimal from 'decimal.js';

export const addThousandsSeparator = ({
  number,
  decimalSeparator,
  thousandsSeparator,
}: {
  number: string;
  decimalSeparator: string;
  thousandsSeparator: string;
}) => {
  if (thousandsSeparator === decimalSeparator)
    throw new Error('Thousands separator cannot be the same as decimal separator');

  const regex = new RegExp(`\\B(?<!\\${decimalSeparator}\\d*)(?=(\\d{3})+(?!\\d))`, 'g');
  return number.replace(regex, thousandsSeparator);
};

/**
 * Format number showing:
 * - Minimum significant figures
 * - Minimum digital places (although not showing them if not required)
 * - Rounding up decimal part
 * - Removing trailing zeros
 * - Adding thousands separator
 */
export const formatNumber = ({
  number,
  minSignificantFigures,
  minDecimalPlaces,
}: {
  number: string;
  minSignificantFigures: number;
  minDecimalPlaces: number;
}) => {
  let formattedNumber = new Decimal(number).toSignificantDigits(minSignificantFigures);
  if (formattedNumber.decimalPlaces() < minDecimalPlaces) {
    formattedNumber = new Decimal(number).toDecimalPlaces(minDecimalPlaces);
  }
  const formattedNumberWithThousandsSeparator = addThousandsSeparator({
    number: formattedNumber.toString(),
    decimalSeparator: '.',
    thousandsSeparator: ',',
  });
  return formattedNumberWithThousandsSeparator;
};
