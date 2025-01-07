const db = require("./connection.js");
const format = require("pg-format");

// a function that takes a user id and some user fields to update the existing user record with, using a relevant query
async function updateUserRecord(user_id, updatedFields) {
  // make sure there is a  field to update
  if (Object.keys(updatedFields).length === 0) {
    throw new Error("No fields to update");
  }

  // make up the SET part of the query using pg-format so that it's dynamic
  const updateQuery = Object.keys(updatedFields)
    .map((key) => `${key} = %L`) // %L is the placeholder for the query
    .join(", ");

  // tehn format the query using pgformat
  const query = format(
    `UPDATE users SET ${updateQuery} WHERE user_id = %L RETURNING *`,
    ...Object.values(updatedFields), // spread the values
    user_id // and then the user id goes at the end
  );

  try {
    // run the the query
    const result = await db.query(query);

    return result.rows[0]; // then return   the updated user data
  } catch (err) {
    console.error("Error updating user:", err);
    throw new Error("Failed to update user");
  }
}

module.exports = {
  updateUserRecord,
};
