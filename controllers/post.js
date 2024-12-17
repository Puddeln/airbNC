const { insertFavourites } = require("../db/data-inserts");
const { fetchFavourites } = require("../models/properties");

// a function that inserts a new row into the favourites table upon a POST request
exports.postFavourites = async (req, res, next) => {
  try {
    const { guest_id, property_id } = req.body;

    const newFavourite = await insertFavourites({ guest_id, property_id });

    res.status(201).send({
      msg: "Property favourited successfully.",
      favourite_id: newFavourite.favourite_id,
    });
  } catch (error) {
    console.error("error relates to posting a favourite:", error);
    next(error);
  }
};
