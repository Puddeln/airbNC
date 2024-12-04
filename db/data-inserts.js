const db = require("./connection.js");
const format = require("pg-format");

function insertUsers(users) {
  return db.query(
    format(
      `INSERT INTO users (first_name, surname, email, phone_number, role, avatar) VALUES %L RETURNING *`,
      owners.map(
        ({ first_name, surname, email, phone_number, role, avatar }) => [
          first_name,
          surname,
          email,
          phone_number,
          role,
          avatar,
        ]
      )
    )
  );
}

module.exports = { insertUsers };
