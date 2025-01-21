console.log("Current NODE_ENV in run-seed.js:", process.env.NODE_ENV);

const data = require("./data/test");
const seed = require("./seed");

const db = require("./connection.js");

seed(data).then(() => db.end());
