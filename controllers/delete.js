const { deleteFavourite, deleteReview } = require("../db/data-deletes");

exports.deleteFavourites = async (req, res, next) => {
  try {
    // destructure the fav id from the params property of the req object
    const { id } = req.params;

    // delete the favourite from the database using the obtained id but obtain the result to check if it has data
    const result = await deleteFavourite(id);

    if (!result) {
      // if result does not exist then return a 404 code with some relvant message
      return res.status(404).send({ msg: "Favourite not found" });
    }

    // respond with 204 status code to show deleted
    res.status(204).send();
  } catch (error) {
    console.error("error related to deleteFavourites:", error);

    next(error);
  }
};

exports.deleteReviews = async (req, res, next) => {
  try {
    // destructure the review id from the params property of the req object
    const { id } = req.params;

    // delete the review from the database using the obtained id but obtain the result to check if it has data
    const result = await deleteReview(id);

    // if there is no result then there was no review found
    if (!result) {
      // if result does not exist then return a 404 code with some relvant message
      return res.status(404).send({ msg: "Review not found" });
    }

    // respond with 204 status code to show deleted ok
    res.status(204).send();
  } catch (error) {
    console.error("Error related to deleteReviews:", error);

    next(error);
  }
};
