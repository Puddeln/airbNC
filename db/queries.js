exports.createUsersQuery = `CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    surname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone_number VARCHAR,
    role VARCHAR,
    CHECK (role IN ('host', 'guest'))
    avatar VARCHAR
    created_at timestamp NOT NULL DEFAULT NOW());
    `;

exports.createPropertiesQuery = `CREATE TABLE properties (
    property_id SERIAL PRIMARY KEY,
    host_id INT REFERENCES users(user_id),
    name VARCHAR NOT NULL,
    location VARCHAR NOT NULL,
    property_type VARCHAR NOT NULL,
    price_per_night FLOAT NOT NULL,
    description VARCHAR,
    `;

exports.createProperty_typesQuery = `CREATE TABLE property_types (
    property_type VARCHAR REFERENCES properties(property_type),
    description VARCHAR NOT NULL,
    `;

exports.createImagesQuery = `CREATE TABLE images (
    image_id SERIAL PRIMARY KEY,
    property_id INT REFERENCES properties(property_id),
    image_url VARCHAR NOT NULL,
    alt_text VARCHAR NOT NULL,
    `;

exports.createFavouritesQuery = `CREATE TABLE favourites (
    favourite_id SERIAL PRIMARY KEY,
    guest_id INT REFERENCES users(user_id),
    property_id INT REFERENCES properties(property_id),
    `;

exports.createReviewsQuery = `CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    property_id INT REFERENCES properties(property_id),
    guest_id INT REFERENCES users(user_id),
    rating INT NOT NULL,
    comment VARCHAR,
    created_at timestamp NOT NULL DEFAULT NOW());
    `;

exports.createbookingsQuery = `CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    property_id INT REFERENCES properties(property_id),
    guest_id INT REFERENCES users(user_id),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW());
    `;