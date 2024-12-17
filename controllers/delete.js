const { deleteFavourite } = require("../db/data-deletes");

exports.deleteFavourites = async (req, res, next) => {
  try {
    // destructure the fav id from the params property of the req object
    const { id } = req.params;

    // Delete the favourite from the database using the obtained id
    await deleteFavourite(id);

    // Respond with 204 status code to show deleted
    res.status(204).send();
  } catch (error) {
    console.error("error related to deleteFavourites:", error);

    next(error);
  }
};
