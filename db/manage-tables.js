const db = require("./connection.js");
const {
  createReviewsQuery,
  createFavouritesQuery,
  createPropertiesQuery,
  createPropertyTypesQuery,
  createUsersQuery,
} = require("./queries");

async function manageTables() {
  await db.query(`DROP TABLE IF EXISTS users;`);

  await db.query(`DROP TABLE IF EXISTS reviews;`);

  await db.query(`DROP TABLE IF EXISTS favourites;`);

  await db.query(`DROP TABLE IF EXISTS properties;`);

  await db.query(`DROP TABLE IF EXISTS property_types;`);

  await db.query(createReviewsQuery);

  await db.query(createFavouritesQuery);

  await db.query(createPropertiesQuery);

  await db.query(createPropertyTypesQuery);

  await db.query(createUsersQuery);
}

module.exports = manageTables;
