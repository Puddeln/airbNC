const { treasureData, favouritesData } = require("../db/data/test/index");
const {
  fetchProperties,
  fetchSingleProperty,
  fetchSingleFavourite,
  fetchSingleUser,
  fetchReviews,
} = require("../models/properties");

// a function that fetches properties upon a GET request
exports.getProperties = async (req, res, next) => {
  try {
    const properties = await fetchProperties();
    // sending a response
    res.status(200).send({ properties });
  } catch (error) {
    console.error("Error related to getProperties:", error);
    next(error);
  }
};

// a function that fetches reviews for a specific property upon a GET request where a property ID is given
exports.getPropertyReviews = async (req, res, next) => {
  try {
    // obtain the passed property id from the params property of the req object
    const propertyId = req.params.id;

    // fetch all reviews using the fetchReviews function
    const reviews = await fetchReviews();

    // filter the reviews for the specific property id only
    const propertyReviews = reviews.filter(
      (review) => review.property_id === parseInt(propertyId)
    );

    // if there are some reviews then work out the average rating
    let averageRating = 0;
    if (propertyReviews.length) {
      const sumRatings = propertyReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      averageRating = (sumRatings / propertyReviews.length).toFixed(1);
    } else {
      averageRating = 0;
    }

    // sending a response
    res.status(200).send({ reviews, average_rating: averageRating });
  } catch (error) {
    console.error("Error related to getReviews:", error);
    next(error);
  }
};

// a function that fetches a specific property upon a GET request where an ID is given
exports.getSingleProperty = async (req, res, next) => {
  // gets the user id from the query on the request object
  const userId = req.query.user_id;

  // destructure the property id from the params property of the req object
  const { id } = req.params;

  try {
    // fetch the specific property from the database using the obtained id
    const property = await fetchSingleProperty(id);

    // check if the property was actually found
    if (!property) {
      // if no property found send an error message
      return res.status(404).send({ message: "Property not found" });
    }

    // handle for the case where a user id is given in the query
    if (userId) {
      // fetch the favourite property of the passed user id using the fetchSingleFavourite function
      const favourite = await fetchSingleFavourite(userId);

      // check if the property is favourited by this user
      let favourited = false;
      // check if the property id matches the given id, if it is set favourited to true as property has been favourited by the given user
      if (favourite && favourite.length > 0) {
        for (let i = 0; i < favourite.length; i++) {
          if (favourite[i].property_id === parseInt(id)) {
            favourited = true;
            break;
          }
        }
      }

      // respond with the property data plus the user id date if it exists and add favourited status to the end of the property object
      const propertyWithFav = { ...property, favourited };

      // respond with the property data plus the user id date if it exists
      return res.status(200).json({ property: propertyWithFav });
    } else {
      return res.status(200).json(property);
    }
  } catch (error) {
    console.error("Error related to getSingleProperty:", error);
    next(error);
  }
};

// a function that fetches a specific user upon a GET request where an ID is given
exports.getSingleUser = async (req, res, next) => {
  // destructure the user id from the params property of the req object
  const { id } = req.params;

  try {
    // fetch the specific user from the database using the obtained id
    const user = await fetchSingleUser(id);

    // check if the user was actually found
    if (!user) {
      // if no user found send an error message
      return res.status(404).send({ message: "user not found" });
    }

    // return the fetched user object nested in an object
    return res.status(200).json({
      user: {
        user_id: user.user_id,
        first_name: user.first_name,
        surname: user.surname,
        email: user.email,
        phone_number: user.phone_number,
        avatar: user.avatar,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("Error related to getSingleUser:", error);
    next(error);
  }
};
