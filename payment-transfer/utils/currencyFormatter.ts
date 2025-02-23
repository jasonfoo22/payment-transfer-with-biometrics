export const convertCurrencyValue = (value: string) => {
  return value
    .replace(/^0+(\d)/, '$1')
    .replace(/[^\d.]/g, '')
    .replace(/(\.\d\d)\d*/, '$1')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
