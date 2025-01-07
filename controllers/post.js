const { insertFavourites, insertReview } = require("../db/data-inserts");
const { fetchFavourites, fetchReviews } = require("../models/properties");

// a function that inserts a new row into the favourites table upon a POST request
exports.postFavourites = async (req, res, next) => {
  try {
    // destructure the request body to obtain the guest id and property id
    const { guest_id, property_id } = req.body;

    // insert the new favourite into the database
    const newFavourite = await insertFavourites({ guest_id, property_id });

    // return a status showing the property has been favourited ok
    res.status(201).send({
      msg: "Property favourited successfully.",
      favourite_id: newFavourite.favourite_id,
    });
  } catch (error) {
    console.error("Error relates to posting a favourite:", error);
    next(error);
  }
};

// a function that inserts a new row into the reviews table upon a POST request
exports.postReviews = async (req, res, next) => {
  try {
    // destructure the request body to obtain the guest id, rating and comment from the payload
    const { guest_id, rating, comment } = req.body;

    // obtain the property id from the url paramater
    const { id } = req.params;

    // insert the new review into the database
    const newReview = await insertReview(guest_id, rating, comment, id);

    // respond with the newly created review and 201 status message
    res.status(201).send({
      review_id: newReview.rows[0].review_id,
      property_id: newReview.rows[0].property_id,
      guest_id: newReview.rows[0].guest_id,
      rating: newReview.rows[0].rating,
      comment: newReview.rows[0].comment,
      created_at: newReview.rows[0].created_at,
    });
  } catch (error) {
    console.error("Error relates to posting a review:", error);
    next(error);
  }
};
