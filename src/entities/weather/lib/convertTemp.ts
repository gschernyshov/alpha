export const convertTemp = (
  celsius: number,
  targetUnit: 'C' | 'F' | 'K'
): number => {
  switch (targetUnit) {
    case 'C':
      return celsius
    case 'F':
      return (celsius * 9) / 5 + 32
    case 'K':
      return celsius + 273.15
    default:
      return celsius
  }
}
