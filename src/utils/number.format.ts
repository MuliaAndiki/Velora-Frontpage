export function formatNumber(num: number, isCurrency = false) {
  if (isCurrency) {
    return num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'IDR',
    });
  }

  return num.toLocaleString('en-US');
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};
