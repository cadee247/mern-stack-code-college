// 1. Import MongoDB client and ObjectId utility
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

// 2. Initialize a variable to store the movies collection reference
let movies;

// 3. Define the MoviesDAO class
export default class MoviesDAO {

  // 3.1 Inject a database connection into this DAO once on startup
  static async injectDB(conn) {
    if (movies) {
      // If already connected, don't reconnect
      return;
    }
    try {
      // Connect to the movies collection in the specified database
      movies = await conn.db(process.env.MOVIEREVIEWS_NS)
                        .collection('movies');
    } catch (e) {
      console.error(`unable to connect in MoviesDAO: ${e}`);
    }
  }

  // 3.2 Retrieve a specific movie by its ID, along with its reviews
  static async getMovieById(id) {
    try {
      // Use an aggregation pipeline to fetch movie and its related reviews
      return await movies.aggregate([
        {
          // Match a single movie document by its _id
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          // Perform a join between movies and reviews collections
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'movie_id',
            as: 'reviews',
          },
        },
      ]).next(); // Return the first matching result
    } catch (e) {
      console.error(`something went wrong in getMovieById: ${e}`);
      throw e;
    }
  }

  // 3.3 Retrieve a paginated list of movies, with optional filters
  static async getMovies({
    filters = null,
    page = 0,
    moviesPerPage = 20,
  } = {}) {
    let query;

    // 3.3.1 Build query based on filters
    if (filters) {
      if ("title" in filters) {
        // Text search on the 'title' field
        query = { $text: { $search: filters['title'] } };
      } else if ("rated" in filters) {
        // Exact match on the 'rated' field (e.g. "PG", "G")
        query = { "rated": { $eq: filters['rated'] } };
      }
    }

    let cursor;
    try {
      // 3.3.2 Fetch documents using the built query with pagination
      cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page);

      // 3.3.3 Convert results to array and count total matches
      const moviesList = await cursor.toArray();
      const totalNumMovies = await movies.countDocuments(query);

      // Return both the list and total for pagination UI
      return { moviesList, totalNumMovies };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }

  // 3.4 Retrieve all distinct ratings used in the collection
  static async getRatings() {
    let ratings = [];
    try {
      // Use MongoDB's distinct to get all unique 'rated' values
      ratings = await movies.distinct("rated");
      return ratings;
    } catch (e) {
      console.error(`unable to get ratings, ${e}`);
      return ratings;
    }
  }
}