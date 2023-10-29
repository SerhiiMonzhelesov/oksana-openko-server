const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

const applicationsRouter = require("./routes/api/applications");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const corsOptions = {
  origin: "*",
  methods: "POST",
  optionsSuccessStatus: 204,
  // "200 // some legacy browsers (IE11, various SmartTVs) choke on 204",
  credentials: true,
  headersAllowed: ["Content-Type", "application/json"],
};

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/application", applicationsRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;
