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
function insertProperties(properties, userRef) {
  return db.query(
    format(
      `INSERT INTO properties (host_id, name, property_type, location, price_per_night, description) VALUES %L RETURNING *`,
      properties.map(
        ({
          host_name,
          name,
          property_type,
          location,
          price_per_night,
          description,
        }) => [
          userRef[host_name],
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
function insertReviews(reviews, userRef, propertiesRef) {
  return db.query(
    format(
      `INSERT INTO reviews (property_id, guest_id, rating, comment) VALUES %L RETURNING *`,
      reviews.map(({ property_name, guest_name, rating, comment }) => [
        propertiesRef[property_name],
        userRef[guest_name],
        rating,
        comment,
      ])
    )
  );
}

// Insert favourite data into built tables
function insertFavourites(favourites, userRef, propertiesRef) {
  return db.query(
    format(
      `INSERT INTO favourites (guest_id, property_id) VALUES %L RETURNING *`,
      favourites.map(({ guest_name, property_name }) => [
        userRef[guest_name],
        propertiesRef[property_name],
      ])
    )
  );
}

module.exports = {
  insertUsers,
  insertPropertyTypes,
  insertProperties,
  insertImages,
  insertReviews,
  insertFavourites,
};
