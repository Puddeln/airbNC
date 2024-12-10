const express = require("express");
const { getProperties } = require("../controllers/get");

// set up an express server
const app = express();

// endpoint for GET request of properties user the getProperties function in the controller for GET
app.get("/api/properties", getProperties);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "path not found" });
});

module.exports = app;
