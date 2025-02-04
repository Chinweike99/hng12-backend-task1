import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { primeNumber, perfectNumber, isArmstrong, digitSum } from "./herpers.js";

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// API endpoint
app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;

  // Validate input
  const num = parseInt(number, 10);
  if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
    return res.status(400).json({
      number: number,
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
  if (num % 2 === 0) {
    properties.push("even");
  } else {
    properties.push("odd");
  }

  // Prepare response
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
