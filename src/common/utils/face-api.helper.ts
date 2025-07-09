export function euclideanDistance(a: number[] | Float32Array, b: number[] | Float32Array): number {
  if (a.length !== b.length) {
    throw new Error('Los vectores deben tener la misma longitud');
  }

  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = a[i] - b[i];
    sum += diff * diff;
  }

  return Math.sqrt(sum);
}
