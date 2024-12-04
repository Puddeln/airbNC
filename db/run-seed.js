process.env.NODE_ENV = "test";

const data = require("./data");
const seed = require("./seed");

const db = require("./connection.js");

seed(data).then(() => db.end());
