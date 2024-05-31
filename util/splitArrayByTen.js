export const splitArrayByTen = (arr) => {
  const nestedArray = []
  for (let i = 0; i < arr.length; i += 10) {
    nestedArray.push(arr.slice(i, i + 10))
  }
  return nestedArray
}