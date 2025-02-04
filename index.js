import express from 'express'
import cors from 'cors'
import axios from 'axios';



const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Function to check if num is a prime number
const primeNumber = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Function to check if number is  perfect.
const perfectNumber = (num) => {
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
const isArmstrong = (num) => {
  const digits = String(num).split("");
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(Number(digit), digits.length),
    0
  );
  return sum === num;
};

// Function to add didgits
const digitSum = (num) => {
  return String(num)
    .split("")
    .reduce((acc, digit) => acc + Number(digit), 0);
};



// API endpoint
app.get("/api/classify-number", async (req, res) => {
    const num = parseInt(req.query.number);
    // const {num} = req.query
    
  
    // Validate input
    if (isNaN(num) || num < 0) {
      return res.status(400).json({
        number: req.query.number,
        error: true,
      });
    }
  
    // Fetch fun fact from Numbers API
    let funFact = "No fun fact available for this number.";
    try {
      const response = await axios.get(`http://numbersapi.com/${num}/math`);
      funFact = response.data;
    } catch (error) {
      console.error("Error fetching fun fact:", error.message);
    }
  
    // Calculate properties
    const properties = [];
    if (isArmstrong(num)) properties.push("armstrong");
    if (num % 2 !== 0) properties.push("odd");
    if (num % 2 === 0) properties.push("even");
  
    const response = {
      number: num,
      is_prime: primeNumber(num),
      is_perfect: perfectNumber(num),
      properties: properties,
      digit_sum: digitSum(num),
      fun_fact: funFact,
    };
  
    res.status(200).json(response);
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });