export const easyAnimation = [0.36, 0.66, 0.04, 1]
export const slideToBottomVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  close: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

export const flipVariants = {
  open: {
    scaleY: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: easyAnimation },
  },
  close: {
    scaleY: 0,
    y: -6,
    opacity: 0,
    transition: { duration: 0.2, ease: easyAnimation },
  },
}
