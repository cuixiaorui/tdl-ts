type Concat<T extends unknown[], Y extends unknown[]> = [...T, ...Y];

// js
function Concat(arrA, arrB) {
  // spread

  return [...arrA, ...arrB];
}