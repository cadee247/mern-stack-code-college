// Import Express framework
import express from 'express';

// Import controller logic for movies and reviews
import MoviesController from './movies.controller.js';
import ReviewsController from './reviews.controller.js';

// Initialize a new Express router instance
const router = express.Router();

/*
  ROUTES FOR MOVIES
*/

// Route: GET /api/v1/movies
// Description: Returns a list of movies (with optional filters and pagination)
router.route('/').get(MoviesController.apiGetMovies);

// Route: GET /api/v1/movies/id/:id
// Description: Returns a specific movie document by its ID, including related reviews
router.route("/id/:id").get(MoviesController.apiGetMovieById);

// Route: GET /api/v1/movies/ratings
// Description: Returns a list of all unique movie ratings (e.g., G, PG, R)
router.route("/ratings").get(MoviesController.apiGetRatings);

/*
  ROUTES FOR REVIEWS
  These handle POST, PUT, and DELETE requests on the /api/v1/movies/review endpoint
*/

// Route: POST /api/v1/movies/review
// Description: Submits a new review to the database
// Route: PUT /api/v1/movies/review
// Description: Updates an existing review
// Route: DELETE /api/v1/movies/review
// Description: Deletes an existing review
router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

// Export the configured router so it can be used in server.js
export default router;