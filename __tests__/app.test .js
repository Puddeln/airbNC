const request = require("supertest");
const app = require("../server/app.js");
const db = require("../db/connection.js");
const seed = require("../db/seed.js");
const data = require("../db/data/test/index.js");
require("jest-sorted");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("app", () => {
  test("invalid end point 404 path not found", () => {
    return request(app)
      .get("/invalid/endpoint")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("path not found");
      });
  });

  describe("GET", () => {
    describe("/api/properties", () => {
      test("respond with a 200 status code and each property object has: property_id, host_id, name, location, price_per_night, description", () => {
        return request(app)
          .get("/api/properties")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            for (let i = 0; i < body.properties.length; i++) {
              expect(body.properties[i].hasOwnProperty("property_id")).toBe(
                true
              );
              expect(body.properties[i].hasOwnProperty("host_id")).toBe(true);
              expect(body.properties[i].hasOwnProperty("name")).toBe(true);
              expect(body.properties[i].hasOwnProperty("location")).toBe(true);
              expect(body.properties[i].hasOwnProperty("price_per_night")).toBe(
                true
              );
              expect(body.properties[i].hasOwnProperty("description")).toBe(
                true
              );
            }
          });
      });
    });
    describe("/api/properties/:id", () => {
      test("respond with a 200 status code and a specific property object according to given id", () => {
        return request(app)
          .get("/api/properties/1")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            expect(body).toHaveProperty("property_id");

            // add others and match expected
            expect(body).toHaveProperty("name");
            expect(body).toHaveProperty("location");
            expect(body).toHaveProperty("price_per_night");
            expect(body).toHaveProperty("description");
            expect(body).toHaveProperty("host_id");

            // check if the property_id matches the ID in the URL
            expect(body.property_id).toBe(1);

            // check that the property returned is not an empty object
            expect(Object.keys(body).length).toBeGreaterThan(0);
          });
      });
      test("respond with a 404 status code when property is not found", () => {
        return request(app)
          .get("/api/properties/199988")
          .expect(404)
          .then(({ body }) => {
            console.log(body);
          });
      });
      test("should take the optional query ?user_id=<id> and respond with an object indicating whether the passed user has favourited this property or not", () => {
        // ***** need to make sure the output matches the specified reponse with same fields
        // first make a user favourite a property using the post request
        return request(app)
          .post("/api/properties/1/favourite")
          .send({ guest_id: 1, property_id: 1 })
          .expect(201) // makes sure the property was favourited ok
          .then(() => {
            // then after the property has been favourited make a GET request with the given user_ID query
            return request(app)
              .get("/api/properties/1?user_id=1")
              .expect(200) // makes sure the property was returned ok
              .then(({ body }) => {
                // then finaly check if the property was favourited by the user
                expect(body.property).toHaveProperty("favourited", true);
                console.log(body);
              });
          });
      });
    });
    describe("/api/properties/:id/reviews", () => {
      test("respond with a 200 status code and an array of reviews according to the passed property id", () => {
        return request(app)
          .get("/api/properties/1/reviews")
          .expect(200)
          .then(({ body }) => {
            console.log("Body: ", body);
            expect(body).toHaveProperty("reviews"); // check that 'reviews' property exists
            expect(Array.isArray(body.reviews)).toBe(true); // make sure that the resonse from the controller reviews is an array
            expect(body.reviews[0]).toHaveProperty("review_id"); // check that the first review has a review_id
            expect(body.reviews[0]).toHaveProperty("rating"); // check that the first review has a rating property
          });
      });
    });
    describe("/api/users/:id", () => {
      test("respond with a 200 status code and an object containing date for a single user specified by passed user id", () => {
        return request(app)
          .get("/api/users/1")
          .expect(200)
          .then(({ body }) => {
            expect(body.user).toHaveProperty("user_id");

            // add others and match expected
            expect(body.user).toHaveProperty("first_name");
            expect(body.user).toHaveProperty("surname");
            expect(body.user).toHaveProperty("email");
            expect(body.user).toHaveProperty("phone_number");
            expect(body.user).toHaveProperty("avatar");
            expect(body.user).toHaveProperty("created_at");

            // check if the property_id matches the ID in the URL
            expect(body.user.user_id).toBe(1);

            // check that the property returned is not an empty object
            expect(Object.keys(body).length).toBeGreaterThan(0);
          });
      });
    });
  });

  describe("POST", () => {
    // ***  add subtest here, needs nesting
    test("respond with a 201 status code and successfull insert a favourite", () => {
      return request(app)
        .post("/api/properties/1/favourite")
        .send({ guest_id: 1, property_id: 1 })
        .expect(201)
        .then(({ body }) => {
          expect(body).toHaveProperty(
            "msg",
            "Property favourited successfully."
          );
          expect(body).toHaveProperty("favourite_id");
        });
    });
    describe("/api/properties/:id/reviews", () => {
      test("should insert a new row into the reviews table, should respond with 201 Status code and a review object", () => {
        return request(app)
          .post("/api/properties/1/reviews")
          .send({
            guest_id: 1,
            rating: 3,
            comment: "Bloody smashing property",
          })
          .expect(201)
          .then(({ body }) => {
            console.log(body);
            expect(body).toHaveProperty("review_id");
            expect(body).toHaveProperty("property_id", 1); // the property id should be the one passed in the url
            expect(body).toHaveProperty("guest_id", 1); //  the guest id should be the one sent
            expect(body).toHaveProperty("rating", 3); // the rating should match the one sent
            expect(body).toHaveProperty("comment", "Bloody smashing property"); // the comment shoould be the one sent
            expect(body).toHaveProperty("created_at"); // some time stamp is returned
          });
      });
    });
  });

  describe("DELETE", () => {
    describe("/api/favourites/:id", () => {
      // happy path :)
      test("respond with a 204 status code and body to be an empty object showing that the favourie has been deleted", () => {
        return request(app)
          .delete("/api/favourites/1")
          .expect(204) // showing that there is nothing there
          .then(({ body }) => {
            expect(body).toEqual({}); // expect body to be empty object
          });
      });
      // sad path :(
      test("respond with a 404 status code if favourite id does not exist", () => {
        return request(app)
          .delete("/api/favourites/99999239") // try to delete some non existing favourite id
          .expect(404) // should give 404 if the favourite doesn't exist
          .then(({ body }) => {
            expect(body.msg).toBe("Favourite not found"); // sends some related error message
          });
      });
    });
    describe("/api/reviews/:id", () => {
      // happy path :)
      test("respond with a 204 status code and body to be an empty object showing that the review has been deleted", () => {
        return request(app)
          .delete("/api/reviews/1")
          .expect(204) // showing that there is nothing there
          .then(({ body }) => {
            expect(body).toEqual({}); // expect body to be empty object
          });
      });
      // sad path :(
      test("respond with a 404 status code if review id does not exist", () => {
        return request(app)
          .delete("/api/reviews/198889") // try to delete some non existing review id
          .expect(404) // should give 404 if the favourite doesn't exist
          .then(({ body }) => {
            expect(body.msg).toBe("Review not found"); // sends some related error message
          });
      });
    });
  });
});

// tests related to patch requests that update existing user data in the database
describe("PATCH /api/users/:id", () => {
  // happy path : )
  test("respond with a 200 status code and the updated user object", () => {
    const updateData = {
      first_name: "Peter",
      surname: "Jackson",
      email: "peter.jackson@lotr.com",
      phone: "1234567890",
      avatar: "https://example.com/peter-jackson.jpg",
    };

    return request(app)
      .patch("/api/users/1")
      .send(updateData)
      .expect(200)
      .then(({ body }) => {
        // response should contain the updated user properties
        expect(body).toHaveProperty("user_id", 1);
        expect(body).toHaveProperty("first_name", "Peter");
        expect(body).toHaveProperty("surname", "Jackson");
        expect(body).toHaveProperty("email", "peter.jackson@lotr.com");
        expect(body).toHaveProperty("phone_number", "1234567890");
        expect(body).toHaveProperty(
          "avatar",
          "https://example.com/peter-jackson.jpg"
        );
        expect(body).toHaveProperty("created_at");
      });
  });

  // sad path :(
  test("respond with a 400 status if a request body is sent no fields", () => {
    return request(app)
      .patch("/api/users/1") // some user that exists
      .send({}) // send some empty object so no fields to update
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("no fields to update given");
      });
  });

  test("respond with a 404 status code if user with given id does not exist", () => {
    const updateData = {
      first_name: "Jane",
      surname: "Smith",
    };

    return request(app)
      .patch("/api/users/2672783") // some user that doesn't exist in the database
      .send(updateData)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });
});
