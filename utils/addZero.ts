export function addZero(num: number) {
  const zero = num > 9 ? '' : '0'
  return `${zero}${num}`
}
