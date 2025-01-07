const db = require("./connection.js");
const format = require("pg-format");

async function deleteFavourite(favourite_id) {
  try {
    // delete the speficic favourite from the favourites table
    const result = await db.query(
      `DELETE FROM favourites WHERE favourite_id = $1 RETURNING *`,
      [favourite_id]
    );

    // if no rows were returned, the favourite does not exist
    if (result.rows.length === 0) {
      return null;
    }

    // return the deleted favourite object
    return result.rows[0];
  } catch (err) {
    throw new Error("Failed to delete favourite");
  }
}

async function deleteReview(review_id) {
  try {
    // delete the speficic review from the reviews table
    const result = await db.query(
      `DELETE FROM reviews WHERE review_id = $1 RETURNING *`,
      [review_id]
    );

    // if no rows were returned, the favourite does not exist
    if (result.rows.length === 0) {
      return null;
    }

    // returns the result to the controller if review was successfully deleted
    return result.rows[0];
  } catch (err) {
    throw new Error("Failed to delete review");
  }
}

module.exports = {
  deleteFavourite,
  deleteReview,
};
