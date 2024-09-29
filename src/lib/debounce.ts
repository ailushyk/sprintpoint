export const debounce = <T extends object>(
  func: (...args: T[]) => void,
  wait: number,
) => {
  let timeout: NodeJS.Timeout | null = null
  return (...args: T[]) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
