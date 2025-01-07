const db = require("../db/connection");
const format = require("pg-format");

exports.fetchProperties = () => {
  return db.query("SELECT * FROM properties;").then(({ rows }) => {
    return rows;
  });
};

exports.fetchSingleProperty = async (property_id) => {
  try {
    // query to fetch a specific property by id
    const result = await db.query(
      `SELECT * FROM properties WHERE property_id = $1`,
      [property_id]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error("Failed to fetch property by id");
  }
};

exports.fetchSingleUser = async (user_id) => {
  try {
    // query to fetch a specific user by id
    const result = await db.query(`SELECT * FROM users WHERE user_id = $1`, [
      user_id,
    ]);
    return result.rows[0];
  } catch (err) {
    throw new Error("Failed to fetch user by id");
  }
};

exports.fetchUsers = () => {
  // query to fetch all users
  return db.query("SELECT * FROM users;").then(({ rows }) => {
    return rows;
  });
};

// a function that fetches the property favourited by a passed user id
exports.fetchSingleFavourite = async (userId) => {
  try {
    const result = await db.query(
      "SELECT * FROM favourites WHERE guest_id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      console.log("No favourites found for user");
      return []; // return empty array if no favourites found
    }

    return result.rows;
  } catch (err) {
    console.error("Error fetching favourites:", err.message);
    throw new Error("Failed to fetch favourites");
  }
};

exports.fetchPropertyTypes = () => {
  // query to fetch all property types
  return db.query("SELECT * FROM property_types").then(({ rows }) => {
    return rows;
  });
};

exports.fetchReviews = () => {
  // query to fetch all reviews
  return db
    .query("SELECT * FROM reviews ORDER BY created_at DESC")
    .then(({ rows }) => {
      return rows;
    });
};

exports.fetchImages = () => {
  // query to fetch all images
  return db.query("SELECT * FROM images").then(({ rows }) => {
    return rows;
  });
};

exports.fetchBookings = () => {
  // query to fetch all bookings
  return db.query("SELECT * FROM bookings").then(({ rows }) => {
    return rows;
  });
};
