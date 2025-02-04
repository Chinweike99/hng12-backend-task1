// Function to check if num is a prime number
export const primeNumber = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Function to check if number is  perfect.
export const perfectNumber = (num) => {
  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (num % i === 0) sum += i;
  }
  return sum === num;
};

/**
 * isArmstrong - function to check if a number.
 * armstrong: is a number that is equal to the sum of its own digits, each raised to the power of the number of digits.
 */
export const isArmstrong = (num) => {
  const digits = String(num).split("");
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(Number(digit), digits.length),
    0
  );
  return sum === num;
};

// Function to add didgits
export const digitSum = (num) => {
  return String(num)
    .split("")
    .reduce((acc, digit) => acc + Number(digit), 0);
};
