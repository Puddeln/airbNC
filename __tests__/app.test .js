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
      test("each property object has: property_id, host_id, name, location, price_per_night, description", () => {
        return request(app)
          .get("/api/properties")
          .expect(200)
          .then(({ body }) => {
            console.log(body);

            expect(body.properties[0].hasOwnProperty("property_id")).toBe(true);
            expect(body.properties[0].hasOwnProperty("host_id")).toBe(true);
            expect(body.properties[0].hasOwnProperty("name")).toBe(true);
            expect(body.properties[0].hasOwnProperty("location")).toBe(true);
            expect(body.properties[0].hasOwnProperty("price_per_night")).toBe(
              true
            );
            expect(body.properties[0].hasOwnProperty("description")).toBe(true);
          });
      });
    });
  });
});
