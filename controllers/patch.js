const { updateUserRecord } = require("../db/data-updates");
const { fetchSingleUser } = require("../models/properties");

exports.updateUser = async (req, res, next) => {
  // destructure the user id from the params property of the req object
  const { id } = req.params;
  // obtain the fields to update the user record with from the request body
  const newUserData = req.body;

  // fetch the existing user data using fetchSingleUser
  try {
    const user = await fetchSingleUser(id);

    // if the user doesn't exist return a 404 error
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    // create an object to store the updated fields
    const updatedFields = {};

    // add fields to the new object but only ones that are provided in the request body
    if (newUserData.first_name)
      updatedFields.first_name = newUserData.first_name;
    if (newUserData.surname) updatedFields.surname = newUserData.surname;
    if (newUserData.email) updatedFields.email = newUserData.email;
    if (newUserData.phone) updatedFields.phone_number = newUserData.phone;
    if (newUserData.avatar) updatedFields.avatar = newUserData.avatar;

    // if no valid fields provided return a 400 error
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).send({ msg: "no fields to update given" });
    }

    // then update the original the user in the database using the updateUserRecord function
    const updatedUser = await updateUserRecord(id, updatedFields);

    // then return the updated user object with a 200 code
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error related to updateUser:", error);
    next(error); // Pass error to error handler
  }
};
