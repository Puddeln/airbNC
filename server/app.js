const express = require("express");
const { getProperties } = require("../controllers/get");
const { postFavourites } = require("../controllers/post");
const { deleteFavourites } = require("../controllers/delete");

// set up an express server
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// endpoint for GET request of properties uses the getProperties function in the controller for GET
app.get("/api/properties", getProperties);

// endpoint for POST request of properties, uses the postFavourites function in the controller for POST
app.post("/api/properties/:id/favourite", postFavourites);

// endpoint for DELETE request of properties, uses the deleteFavourites function in the controller for DELETE
app.delete("/api/favourites/:id", deleteFavourites);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "path not found" });
});

module.exports = app;
