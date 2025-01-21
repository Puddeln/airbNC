const { Pool } = require("pg");
const dotenv = require("dotenv");

// set up the environment, defaults to development if NODE_ENV is not set
const ENV = process.env.NODE_ENV || "development";
const config = {};

// Adjust path for .env files based on folder structure
const envFilePath =
  ENV === "production"
    ? `${__dirname}/../.env.production`
    : `${__dirname}/../.env.development`;

// load environment variables
dotenv.config({ path: envFilePath });

// make sure DATABASE_URL (or PGDATABASE) is set else throw an error
if (!process.env.DATABASE_URL && !process.env.PGDATABASE) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

// set up the connection pool based on the environment
if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
}

// create and export the connection pool
module.exports = new Pool(config);
