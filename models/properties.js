const db = require("../db/connection");

exports.fetchProperties = () => {
  return db.query("SELECT * FROM properties;").then(({ rows }) => {
    return rows;
  });
};

exports.fetchUsers = () => {
  return db.query("SELECT * FROM users;").then(({ rows }) => {
    return rows;
  });
};

exports.fetchFavourites = () => {
  return db.query("SELECT * FROM favourites").then(({ rows }) => {
    return rows;
  });
};

exports.fetchPropertyTypes = () => {
  return db.query("SELECT * FROM property_types").then(({ rows }) => {
    return rows;
  });
};

exports.fetchReviews = () => {
  return db.query("SELECT * FROM reviews").then(({ rows }) => {
    return rows;
  });
};

exports.fetchImages = () => {
  return db.query("SELECT * FROM images").then(({ rows }) => {
    return rows;
  });
};

exports.fetchBookings = () => {
  return db.query("SELECT * FROM bookings").then(({ rows }) => {
    return rows;
  });
};
