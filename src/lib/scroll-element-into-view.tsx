export const scrollElementIntoView = ({
  element,
}: {
  element: HTMLElement | null
}) => {
  if (!element) return
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center', // Scroll to the center of the container
    inline: 'center', // Scroll to the horizontal center of the container
  })
}
