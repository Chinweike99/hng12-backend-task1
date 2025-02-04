// import express from 'express';
// import cors from 'cors';
// import axios from 'axios';
// import { primeNumber, perfectNumber, isArmstrong, digitSum } from "./herpers.js";

// const app = express();
// const port = process.env.PORT || 3000;

// // Enable CORS
// app.use(cors());

// // API endpoint
// app.get("/api/classify-number", async (req, res) => {
//   const { number } = req.query;

//   // Validate input
//   const num = parseInt(number, 10);
//   if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
//     return res.status(400).json({
//       number: number,
//       error: true,
//     });
//   }

//   // Fetch fun fact from Numbers API
//   let funFact = "No fun fact available for this number.";
//   try {
//     const response = await axios.get(`http://numbersapi.com/${num}/math`);
//     funFact = response.data;
//   } catch (error) {
//     console.error("Error fetching fun fact:", error.message);
//   }

//   // Calculate properties
//   const properties = [];
//   if (isArmstrong(num)) properties.push("armstrong");
//   if (num % 2 === 0) {
//     properties.push("even");
//   } else {
//     properties.push("odd");
//   }

//   // Prepare response
//   const response = {
//     number: num,
//     is_prime: primeNumber(num),
//     is_perfect: perfectNumber(num),
//     properties: properties,
//     digit_sum: digitSum(num),
//     fun_fact: funFact,
//   };

//   res.status(200).json(response);
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


// // import express from 'express';
// // import cors from 'cors';
// // import axios from 'axios';

// // const app = express();
// // const port = process.env.PORT || 3000;

// // // Enable CORS
// // app.use(cors());

// // // Function to check if num is a prime number
// // const isPrime = (num) => {
// //   if (num < 2) return false;
// //   for (let i = 2; i <= Math.sqrt(num); i++) {
// //     if (num % i === 0) return false;
// //   }
// //   return true;
// // };

// // // Function to check if number is perfect
// // const isPerfect = (num) => {
// //   let sum = 0;
// //   for (let i = 1; i < num; i++) {
// //     if (num % i === 0) sum += i;
// //   }
// //   return sum === num;
// // };

// // // Function to check if number is Armstrong
// // const isArmstrong = (num) => {
// //   const digits = String(num).split('');
// //   const sum = digits.reduce(
// //     (acc, digit) => acc + Math.pow(Number(digit), digits.length),
// //     0
// //   );
// //   return sum === num;
// // };

// // // Function to calculate the sum of digits
// // const digitSum = (num) => {
// //   return String(Math.abs(num))
// //     .split('')
// //     .reduce((acc, digit) => acc + Number(digit), 0);
// // };

// // // API endpoint
// // app.get('/api/classify-number', async (req, res) => {
// //   const { number } = req.query;

// //   // Validate input
// //   const num = parseInt(number, 10);
// //   if (isNaN(num) || !Number.isInteger(num)) {
// //     return res.status(400).json({
// //       number: number,
// //       error: true,
// //     });
// //   }

// //   // Use absolute value for calculations
// //   const absNum = Math.abs(num);

// //   // Fetch fun fact from Numbers API
// //   let funFact = 'No fun fact available for this number.';
// //   try {
// //     const response = await axios.get(`http://numbersapi.com/${absNum}/math`);
// //     funFact = response.data;
// //   } catch (error) {
// //     console.error('Error fetching fun fact:', error.message);
// //   }

// //   // Calculate properties
// //   const properties = [];
// //   if (isArmstrong(absNum)) properties.push('armstrong');
// //   if (absNum % 2 === 0) {
// //     properties.push('even');
// //   } else {
// //     properties.push('odd');
// //   }

// //   // Prepare response
// //   const response = {
// //     number: num, // Return the original input (including negative)
// //     is_prime: isPrime(absNum),
// //     is_perfect: isPerfect(absNum),
// //     properties: properties,
// //     digit_sum: digitSum(num), // Sum of digits of the absolute value
// //     fun_fact: funFact,
// //   };

// //   res.status(200).json(response);
// // });

// // // Start the server
// // app.listen(port, () => {
// //   console.log(`Server is running on http://localhost:${port}`);
// // });


import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Function to check if num is a prime number
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Function to check if number is perfect
const isPerfect = (num) => {
  let sum = 1;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return num !== 1 && sum === num;
};

// Function to check if number is Armstrong
const isArmstrong = (num) => {
  const digits = Math.abs(num).toString().split('');
  const power = digits.length;
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(parseInt(digit), power),
    0
  );
  return sum === Math.abs(num);
};

// Function to calculate the sum of digits
const getDigitSum = (num) =>
  Math.abs(num)
    .toString()
    .split('')
    .reduce((sum, digit) => sum + parseInt(digit), 0);

// API endpoint
app.get('/api/classify-number', async (req, res) => {
  const { number } = req.query;

  // Validate input
  if (!number || isNaN(number) || !Number.isInteger(Number(number))) {
    return res.status(400).json({ number: "alphabet", error: true });
  }

  const num = parseInt(number);

  // Determine properties
  const properties = [];
  if (isArmstrong(num)) properties.push('armstrong');
  properties.push(num % 2 === 0 ? 'even' : 'odd');

  // Fetch fun fact from Numbers API
  let funFact = 'No fun fact available.';
  try {
    const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
    funFact = response.data.text;
  } catch (error) {
    console.error('Error fetching fun fact:', error.message);
  }

  // Prepare response
  const response = {
    number: num,
    is_prime: isPrime(num),
    is_perfect: isPerfect(num),
    properties: properties,
    digit_sum: getDigitSum(num),
    fun_fact: funFact,
  };

  res.status(200).json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});