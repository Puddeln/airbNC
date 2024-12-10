const {
  createRef,
  formatData,
  createUsersRef,
} = require("./data-utilities.js");
const {
  insertUsers,
  insertPropertyTypes,
  insertProperties,
  insertImages,
  insertReviews,
} = require("./data-inserts.js");
const db = require("./connection.js");

const {
  createReviewsQuery,
  createFavouritesQuery,
  createPropertiesQuery,
  createPropertyTypesQuery,
  createUsersQuery,
  createImagesQuery,
  createBookingsQuery,
} = require("./queries");

const {
  usersData,
  bookingsData,
  favouritesData,
  imagesData,
  propertiesData,
  propertyTypesData,
  reviewsData,
} = require("./data/test/index.js");

async function seed() {
  await db.query(`DROP TABLE IF EXISTS users CASCADE;`);

  await db.query(`DROP TABLE IF EXISTS properties CASCADE;`);

  await db.query(`DROP TABLE IF EXISTS property_types CASCADE;`);

  await db.query(`DROP TABLE IF EXISTS images CASCADE;`);

  await db.query(`DROP TABLE IF EXISTS favourites CASCADE;`);

  await db.query(`DROP TABLE IF EXISTS reviews CASCADE;`);

  await db.query(`DROP TABLE IF EXISTS bookings CASCADE;`);

  await db.query(createUsersQuery);

  await db.query(createPropertyTypesQuery);

  await db.query(createPropertiesQuery);

  await db.query(createImagesQuery);

  await db.query(createFavouritesQuery);

  await db.query(createReviewsQuery);

  //await db.query(createBookingsQuery);

  const { rows: insertedUsers } = await insertUsers(usersData);
  const userRef = createUsersRef(insertedUsers);

  await insertPropertyTypes(propertyTypesData);

  await insertProperties(propertiesData, userRef);

  await insertImages(imagesData);

  await insertReviews(reviewsData);
}

module.exports = seed;
