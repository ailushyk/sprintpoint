import { debounce } from './debounce'

describe('debounce', () => {
  jest.useFakeTimers()

  it('should call the function after the specified wait time', () => {
    const mockFunc = jest.fn()
    const debouncedFunc = debounce(mockFunc, 1000)

    debouncedFunc('test')
    expect(mockFunc).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1000)
    expect(mockFunc).toHaveBeenCalledWith('test')
  })

  it('should not call the function if called again within wait time', () => {
    const mockFunc = jest.fn()
    const debouncedFunc = debounce(mockFunc, 1000)

    debouncedFunc('first')
    debouncedFunc('second')

    jest.advanceTimersByTime(1000)
    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(mockFunc).toHaveBeenCalledWith('second')
  })

  it('should handle multiple calls with different arguments', () => {
    const mockFunc = jest.fn()
    const debouncedFunc = debounce(mockFunc, 1000)

    debouncedFunc('a')
    debouncedFunc('b')
    debouncedFunc('c')

    jest.advanceTimersByTime(1000)
    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(mockFunc).toHaveBeenCalledWith('c')
  })
})
