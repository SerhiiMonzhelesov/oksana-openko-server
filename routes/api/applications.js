const express = require("express");
const ctrl = require("../../controllers/applications");
const { validateBody } = require("../../decorators");
const schemas = require("../../schemas/applications");

const addApplicationValidate = validateBody(schemas.addApplicationSchema);

const router = express.Router();

router.post("/", addApplicationValidate, ctrl.addNewApplication);

router.get("/", (req, res) => {
  res.status(200).json({ message: "server is wake up" });
});

module.exports = router;
