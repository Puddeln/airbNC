const express = require("express");
const {
  getProperties,
  getSingleProperty,
  getPropertyReviews,
  getSingleUser,
} = require("../controllers/get");
const { postFavourites, postReviews } = require("../controllers/post");
const { deleteFavourites, deleteReviews } = require("../controllers/delete");
const { updateUser } = require("../controllers/patch");

// set up an express server
const app = express();

// middleware to parse JSON request bodies
app.use(express.json());

// endpoint for GET request of properties uses the getProperties function in the controller for GET
app.get("/api/properties", getProperties);

// endpoint for GET request of single property by given ID, uses the getSingleProperty function in the controller for GET
app.get("/api/properties/:id", getSingleProperty);

// endpoint for GET request of reviews for specific property given by id, uses the getPropertyReviews function in the controller for GET
app.get("/api/properties/:id/reviews", getPropertyReviews);

// endpoint for GET request of single user by given ID, uses the getSingleUser function in the controller for GET
app.get("/api/users/:id", getSingleUser);

// endpoint for POST request of properties to post favourites, uses the postFavourites function in the controller for POST
app.post("/api/properties/:id/favourite", postFavourites);

// endpoint for POST request of properties to post favourites, uses the postReviews function in the controller for POST
app.post("/api/properties/:id/reviews", postReviews);

// endpoint for DELETE request of reviews, uses the deleteReviews function in the controller for DELETE
app.delete("/api/reviews/:id", deleteReviews);

// endpoint for DELETE request of properties, uses the deleteFavourites function in the controller for DELETE
app.delete("/api/favourites/:id", deleteFavourites);

// endpoint for PATCH request of users, uses the updateUser function in the controller for PATCH, receives a payload of new user details to update with
app.patch("/api/users/:id", updateUser);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "path not found" });
});

module.exports = app;
