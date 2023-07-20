/**
 * Find nearest value
 * https://stackoverflow.com/questions/8584902/get-nearest-number-out-of-array
 */
export function getClosest(needle: number, stock: number[]) {
  return stock.reduce((prev, current) => {
    if (!current) {
      return prev
    }
    return Math.abs(current - needle) < Math.abs(prev - needle) ? current : prev
  }, 0)
}
