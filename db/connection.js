const ENV = process.env.NODE_ENV || "development";
const config = {};

// check that either the development/test PGDATABASE variable or the production DATABASE_URL exists
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}
module.exports = new Pool(config);

const { Pool } = require("pg");

const path = `${__dirname}/../.env.test`;

require("dotenv").config({ path });

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

module.exports = new Pool();
