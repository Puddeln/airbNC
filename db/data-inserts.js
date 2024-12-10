const db = require("./connection.js");
const format = require("pg-format");

// Insert user data into built tables
function insertUsers(users) {
  return db.query(
    format(
      `INSERT INTO users (first_name, surname, email, phone_number, role, avatar) VALUES %L RETURNING *`,
      users.map(
        ({ first_name, surname, email, phone_number, role, avatar }) => [
          first_name,
          surname,
          email,
          phone_number,
          role,
          avatar,
        ]
      )
    )
  );
}

// Insert property type data into built tables
function insertPropertyTypes(property_types) {
  return db.query(
    format(
      `INSERT INTO property_types (property_type, description) VALUES %L RETURNING *`,
      property_types.map(({ property_type, description }) => [
        property_type,
        description,
      ])
    )
  );
}

// Insert property data into built tables
function insertProperties(properties) {
  return db.query(
    format(
      `INSERT INTO properties (name, property_type, location, price_per_night, description) VALUES %L RETURNING *`,
      properties.map(
        ({ name, property_type, location, price_per_night, description }) => [
          name,
          property_type,
          location,
          price_per_night,
          description,
        ]
      )
    )
  );
}

// Insert image data into built tables
function insertImages(images) {
  return db.query(
    format(
      `INSERT INTO images (image_url, alt_text) VALUES %L RETURNING *`,
      images.map(({ image_url, alt_tag }) => [image_url, alt_tag])
    )
  );
}

// Insert review data into built tables
function insertReviews(reviews) {
  return db.query(
    format(
      `INSERT INTO reviews (rating, comment) VALUES %L RETURNING *`,
      reviews.map(({ rating, comment }) => [rating, comment])
    )
  );
}

module.exports = {
  insertUsers,
  insertPropertyTypes,
  insertProperties,
  insertImages,
  insertReviews,
};
