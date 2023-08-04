/**
 * Find nearest value
 * https://stackoverflow.com/questions/8584902/get-nearest-number-out-of-array
 */
export function getClosestValue(needle: number, stock: (number | null)[]) {
  if (needle === null) return null

  return stock.reduce((prev: number, current) => {
    if (!current) {
      return prev
    }
    return Math.abs(current - needle) < Math.abs(prev - needle) ? current : prev
  }, 0)
}
