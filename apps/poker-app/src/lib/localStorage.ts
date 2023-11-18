export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key)
}

export const saveToLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value)
}

export const getJsonFromLocalStorage = (key: string) => {
  // check if code run in browser
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key) || 'null'
    return JSON.parse(saved)
  }
}

export const saveJsonToLocalStorage = (key: string, value: object): void => {
  localStorage.setItem(key, JSON.stringify(value))
}
