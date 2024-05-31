export const pickRandomItem = (array) => {
  if (array.length === 0) {
    return undefined;
  }
  
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}