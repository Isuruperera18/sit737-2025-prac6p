const logger = require("../utils/logger");

exports.add = (req, res) => {
  logRequest("Addition", req.body);
  const { num1, num2 } = req.body;
  const validation = validateInputs(num1, num2);

  if (!validation.valid) {
    logger.error(validation.error);
    return res.status(400).json({ success: false, error: validation.error });
  }

  try {
    const result = num1 + num2;
    logSuccess("Addition", num1, num2, result);
    res.json({ success: true, message: "Addition successful", result });
  } catch (error) {
    handleServerError(res, error, "addition");
  }
};

exports.subtract = (req, res) => {
  logRequest("Subtraction", req.body);
  const { num1, num2 } = req.body;
  const validation = validateInputs(num1, num2);

  if (!validation.valid) {
    logger.error(validation.error);
    return res.status(400).json({ success: false, error: validation.error });
  }

  try {
    const result = num1 - num2;
    logSuccess("Subtraction", num1, num2, result);
    res.json({ success: true, message: "Subtraction successful", result });
  } catch (error) {
    handleServerError(res, error, "subtraction");
  }
};

exports.multiply = (req, res) => {
  logRequest("Multiplication", req.body);
  const { num1, num2 } = req.body;
  const validation = validateInputs(num1, num2);

  if (!validation.valid) {
    logger.error(validation.error);
    return res.status(400).json({ success: false, error: validation.error });
  }

  try {
    const result = num1 * num2;
    logSuccess("Multiplication", num1, num2, result);
    res.json({ success: true, message: "Multiplication successful", result });
  } catch (error) {
    handleServerError(res, error, "multiplication");
  }
};

exports.divide = (req, res) => {
  logRequest("Division", req.body);
  const { num1, num2 } = req.body;
  const validation = validateInputs(num1, num2);

  if (!validation.valid) {
    logger.error(validation.error);
    return res.status(400).json({ success: false, error: validation.error });
  }

  if (num2 === 0) {
    logger.error(`Division by zero attempt: ${num1} / ${num2}`);
    return res.status(400).json({ success: false, error: "Cannot divide by zero" });
  }

  try {
    const result = num1 / num2;
    logSuccess("Division", num1, num2, result);
    res.json({ success: true, message: "Division successful", result });
  } catch (error) {
    handleServerError(res, error, "division");
  }
};

exports.exponent = (req, res) => {
  logRequest("Exponentiation", req.body);
  const { base, exponent } = req.body;
  const validation = validateInputs(base, exponent);

  if (!validation.valid) {
    return res.status(400).json({ success: false, error: validation.error });
  }

  const result = Math.pow(base, exponent);
  logSuccess("Exponentiation", base, exponent, result);
  res.json({ success: true, message: "Exponentiation successful", result });
};

exports.sqrt = (req, res) => {
  logRequest("Square Root", req.body);
  const { number } = req.body;
  if (!isValidNumber(number) || number < 0) {
    return res.status(400).json({ success: false, error: "Input must be a non-negative number" });
  }
  const result = Math.sqrt(number);
  logger.info(`Square root successful: sqrt(${number}) = ${result}`);
  res.json({ success: true, message: "Square root successful", result });
};

exports.modulo = (req, res) => {
  logRequest("Modulo", req.body);
  const { dividend, divisor } = req.body;
  const validation = validateInputs(dividend, divisor);

  if (!validation.valid) {
    return res.status(400).json({ success: false, error: validation.error });
  }
  if (divisor === 0) {
    return res.status(400).json({ success: false, error: "Divisor cannot be zero" });
  }
  
  const result = dividend % divisor;
  logSuccess("Modulo", dividend, divisor, result);
  res.json({ success: true, message: "Modulo operation successful", result });
};

function validateInputs(...values) {
  for (let value of values) {
    if (value === undefined) {
      return { valid: false, error: "All inputs are required" };
    }
    if (!isValidNumber(value)) {
      return { valid: false, error: "All inputs must be valid numbers" };
    }
  }
  return { valid: true };
}

function isValidNumber(value) {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
}

function handleServerError(res, error, operation) {
  logger.error(`Error in ${operation} operation: ${error.message}`);
  res.status(500).json({ success: false, error: "Calculator service unavailable" });
}

function logRequest(operation, requestBody) {
  logger.info(`${operation} request received with data: ${JSON.stringify(requestBody)}`);
}

function logSuccess(operation, num1, num2, result) {
  logger.info(`${operation} successful: ${num1} ${getSymbol(operation)} ${num2} = ${result}`);
}

function getSymbol(operation) {
  const symbols = {
    Addition: "+",
    Subtraction: "-",
    Multiplication: "*",
    Division: "/",
    Exponentiation: "^",
    Modulo: "%"
  };
  return symbols[operation] || "?";
}
