const db = require("./connection.js");
const format = require("pg-format");

// insert user data into built tables
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

// insert property type data into built tables
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

// insert property data into built tables
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

// insert image data into built tables
function insertImages(images) {
  return db.query(
    format(
      `INSERT INTO images (image_url, alt_text) VALUES %L RETURNING *`,
      images.map(({ image_url, alt_tag }) => [image_url, alt_tag])
    )
  );
}

// insert existing review data into built tables
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

// function to insert a single review passed by the post controller into the reviews table
function insertReview(guest_id, rating, comment, id) {
  return db.query(
    `INSERT INTO reviews (property_id, guest_id, rating, comment) 
     VALUES ($1, $2, $3, $4) 
     RETURNING review_id, property_id, guest_id, rating, comment, created_at`,
    [id, guest_id, rating, comment] // pass the individual parameters in the correct order
  );
}

// take the destructured payload and insert a new favourite into the favourites table
async function insertFavourites({ guest_id, property_id }) {
  try {
    const result = await db.query(
      `INSERT INTO favourites (guest_id, property_id) 
       VALUES ($1, $2) 
       RETURNING favourite_id, guest_id, property_id`,
      [guest_id, property_id]
    );
    // return the inserted favourite with the created favourite id included
    return result.rows[0];
  } catch (err) {
    throw new Error("inserting into favourites didn't work");
  }
}

module.exports = {
  insertUsers,
  insertPropertyTypes,
  insertProperties,
  insertImages,
  insertReviews,
  insertReview,
  insertFavourites,
};
