export function currency (num) {
  return new Intl.NumberFormat('zh-CN', {
    currency: 'CNY',
    style: 'currency',
    maximumFractionDigits: 2
  }).format(num)
}
