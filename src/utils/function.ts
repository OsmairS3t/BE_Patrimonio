export function ZeroLeft(value: string, size: number) {
  let add = ''
  if (value.length < size) {
    const rest = size - value.length
    for (let i = 1; i <= rest; i++) {
      add += '0'
    }
  }
  return add + value
}
