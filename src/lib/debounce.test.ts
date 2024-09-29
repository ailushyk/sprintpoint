import { debounce } from './debounce'

jest.useFakeTimers()

describe('debounce', () => {
  it('should call the function after the specified wait time', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func, 1000)

    debouncedFunc()
    expect(func).not.toBeCalled()

    jest.advanceTimersByTime(1000)
    expect(func).toBeCalled()
  })

  it('should call the function with the correct arguments', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func, 1000)

    debouncedFunc('arg1', 'arg2')
    jest.advanceTimersByTime(1000)
    expect(func).toBeCalledWith('arg1', 'arg2')
  })

  it('should reset the timer if called again before the wait time', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func, 1000)

    debouncedFunc()
    jest.advanceTimersByTime(500)
    debouncedFunc()
    jest.advanceTimersByTime(500)
    expect(func).not.toBeCalled()

    jest.advanceTimersByTime(500)
    expect(func).toBeCalled()
  })
})
