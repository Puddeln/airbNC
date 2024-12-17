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
  describe("/api/properties", () => {
    describe("GET", () => {
      test("respond with a 200 status code and each property object has: property_id, host_id, name, location, price_per_night, description", () => {
        return request(app)
          .get("/api/properties")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            for (i = 0; i < body.properties.length; i++) {
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

    describe("POST", () => {
      //add subtest here, needs nesting
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
    });

    describe("DELETE", () => {
      //add subtest heres, needs nesting
      test("respond with a 204 status code and body to be an empty object showing that the favourie has been deleted", () => {
        return request(app)
          .delete("/api/favourites/1")
          .expect(204) // showing that there is nothing there
          .then(({ body }) => {
            expect(body).toEqual({}); // expect body to be empty object
          });
      });
    });
  });
});
