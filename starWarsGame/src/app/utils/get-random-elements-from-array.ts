export function getRandomElements<T>(arr: T[]): T[] {
  if (arr.length < 2) {
    return [];
  }

  const firstIndex = Math.floor(Math.random() * arr.length);

  let secondIndex;

  do {
    secondIndex = Math.floor(Math.random() * arr.length);
  } while (secondIndex === firstIndex);

  return [arr[firstIndex], arr[secondIndex]];
}
