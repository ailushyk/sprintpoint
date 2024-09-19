export function getInitials(name: string | null | undefined) {
  if (!name) return '?'

  const nameSplit = name.split(' ')
  const firstInitial = nameSplit[0].charAt(0).toUpperCase()

  if (nameSplit.length >= 2) {
    const lastInitial = nameSplit[nameSplit.length - 1].charAt(0).toUpperCase()
    return firstInitial + lastInitial
  } else {
    return firstInitial
  }
}
