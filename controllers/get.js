const { treasureData } = require("../db/data/test/index");
const { fetchProperties } = require("../models/properties");

// a function that fetches properties upon a GET request
exports.getProperties = async (req, res, next) => {
  fetchProperties().then((properties) => {
    //sending a response
    res.status(200).send({ properties });
  });
};
