// Import the MoviesDAO to access database methods
import MoviesDAO from '../dao/moviesDAO.js';

// Controller class that handles HTTP requests related to movies
export default class MoviesController {

  // Route handler for GET /api/v1/movies
  static async apiGetMovies(req, res, next) {
    // 1. Set number of movies per page from query param or default to 20
    const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20;

    // 2. Set page number from query param or default to page 0
    const page = req.query.page ? parseInt(req.query.page) : 0;

    // 3. Create filters object to hold query filters if provided
    let filters = {};
    if (req.query.rated) {
      // If 'rated' is in query, use it to filter
      filters.rated = req.query.rated;
    } else if (req.query.title) {
      // Otherwise, check for 'title' filter
      filters.title = req.query.title;
    }

    // 4. Call MoviesDAO to get movies list and total count using filters and pagination
    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage
    });

    // 5. Construct a JSON response with the results
    let response = {
      movies: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    };

    // 6. Send the JSON response to the client
    res.json(response);
  }

  // Route handler for GET /api/v1/movies/id/:id
  static async apiGetMovieById(req, res, next) {
    try {
      // 1. Extract movie ID from URL parameters
      let id = req.params.id || {};

      // 2. Call DAO to find the movie by its ObjectId
      let movie = await MoviesDAO.getMovieById(id);

      // 3. If no movie is found, return 404 error
      if (!movie) {
        res.status(404).json({ error: "not found" });
        return;
      }

      // 4. Return the movie object in the response
      res.json(movie);
    } catch (e) {
      // 5. Log and return server error if something goes wrong
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  // Route handler for GET /api/v1/movies/ratings
  static async apiGetRatings(req, res, next) {
    try {
      // 1. Call DAO to get a list of all distinct movie ratings
      let propertyTypes = await MoviesDAO.getRatings();

      // 2. Return the ratings list in JSON format
      res.json(propertyTypes);
    } catch (e) {
      // 3. Log and return server error if failed
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}