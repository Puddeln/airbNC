const db = require("./connection.js");
const format = require("pg-format");

async function deleteFavourite(favourite_id) {
  try {
    // delete the speficic favourite
    const result = await db.query(
      `DELETE FROM favourites WHERE favourite_id = $1`,
      [favourite_id]
    );
  } catch (err) {
    throw new Error("Failed to delete favourite");
  }
}

module.exports = {
  deleteFavourite,
};
