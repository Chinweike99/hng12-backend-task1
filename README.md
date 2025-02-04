# HNG Stage 1 Task - classify number

## Features
- Identifies if the number is:
  - Prime
  - Perfect
  - Armstrong
  - Even or Odd
- Computes the sum of the digits of the number.
- Fetches a fun fact about the number from [Numbers API](http://numbersapi.com/).
- Validates input and handles errors gracefully.
- Returns responses in JSON format.

## Technology Stack
- **Backend Framework**: Node.js with Express.js
- **HTTP Client**: Axios
- **CORS Handling**: Enabled for cross-origin requests

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/number-classification-api.git
   ```

2. Navigate to the project directory:
   ```bash
   cd number-classification-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:3100` by default.

## API Endpoints

### Endpoint
```
GET /api/classify-number?number=<number>
```

### Query Parameters
- `number`: The number to classify (required, must be an integer).

### Successful Response (200 OK)
```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### Error Response (400 Bad Request)
```json
{
  "number": "abc",
  "error": true
}
```

## Helper Functions
The following helper functions are used to calculate mathematical properties:


## Development
For local development:
- Modify the helper functions in `helpers.js`.
- Ensure `index.js` imports functions correctly from `helpers.js`.



