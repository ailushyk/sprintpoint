import { scrollElementIntoView } from './scroll-element-into-view'

describe('scrollElementIntoView', () => {
  it('should scroll the element into view with smooth behavior and center alignment', () => {
    const mockElement = {
      scrollIntoView: jest.fn(),
    } as unknown as HTMLElement

    scrollElementIntoView({ element: mockElement })

    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    })
  })

  it('should not throw an error if the element is null', () => {
    expect(() => scrollElementIntoView({ element: null })).not.toThrow()
  })
})
