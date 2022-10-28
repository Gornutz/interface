import { BigNumber, ethers, utils } from "ethers"

export function formatNumber(value: string): string {
  const [floor, decimals] = value.split('.')
  if (!decimals) {
    return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  return [floor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'), decimals].join('.')
}

export const formatBigNumber = (value?: BigNumber, units = 18, displayDec = 2): string => {
  if (!value) {
    value = ethers.constants.Zero
  }
  value = BigNumber.from(value);

  const valString = utils.formatUnits(value, units)
  const decimalTrimmed = (() => {
    if (displayDec === 0) {
      return valString.split('.')[0]
    }
    const reg = new RegExp(`(\\.\\d{` + displayDec + `}).*`)
    return valString.replace(reg, '$1')
  })()

  let displayNum = formatNumber(decimalTrimmed)
  if (parseFloat(decimalTrimmed) === 0 && value.gt(0)) {
    // if display shows zero for a non-zero amount,
    // show that the amount is less than display setting ex < 0.001
    displayNum = `< ${displayNum.replace(/.$/, '1')}`
  }

  return displayNum;
}

export const formatMillions = (value: string): string => {
  if (value === '0') return '0.00';
  const parts = value.split('.');
  const steps = parts[0].split(',');
  const first = steps[0];
  const last = steps.length > 1 ? (steps[1][0] + steps[1][1]) : parseFloat(`0.${value.split('.')[1]}`).toFixed(2).split('.')[1];
  const unit = steps.length > 3 ? 'B' : steps.length > 2 ? 'M' : steps.length > 1 ? 'K' : '';
  return `${first}.${last}${unit}`;
}

export const formatMillionsBigNumber = (value?: BigNumber, units = 18, displayDec = 3): string => {
  return formatMillions(formatBigNumber(value, units, displayDec));
}
