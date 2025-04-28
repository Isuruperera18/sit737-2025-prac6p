const express = require("express");
const cors = require("cors");

const calculatorRoutes = require("./routes/calculatorRoutes");

const app = express();

app.use(cors());

app.options("*", cors());

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API is healthy' });
});

app.use("/api/calculator", calculatorRoutes);

module.exports = app;
