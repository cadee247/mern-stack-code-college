// Import the axios library to handle HTTP requests
import axios from "axios";


// Define a service class to manage all movie-related API calls
class MovieDataService {
  
  // Get a list of movies, optionally specifying which page of results to fetch
  getAll(page = 0) {
    return axios.get(`https://mern-backend-bvcr.onrender.com/api/v1/movies?page=${page}`);
  }

  // Retrieve a specific movie by its unique ID
  get(id) {
    return axios.get(`https://mern-backend-bvcr.onrender.com/api/v1/movies/id/${id}`);
  }

  // Search for movies by a query (e.g., title or rating), with optional filters
  find(query, by = "title", page = 0, rating) {
    return axios.get(`https://mern-backend-bvcr.onrender.com/api/v1/movies?${by}=${query}&page=${page}&rating=${rating}`);
  }

  // Send a new review to the backend to be saved
  createReview(data) {
    return axios.post(`https://mern-backend-bvcr.onrender.com/api/v1/movies/review`, data);
  }

  // Update an existing review with new data
  updateReview(data) {
    return axios.put(`https://mern-backend-bvcr.onrender.com/api/v1/movies/review`, data);
  }

  // Delete a review by providing the review ID and the user ID for verification
  deleteReview(id, userId) {
    return axios.delete(`https://mern-backend-bvcr.onrender.com/api/v1/movies/review`, {
      data: { review_id: id, user_id: userId }
    });
  }

  // Fetch a list of all available movie ratings (e.g., PG, G, R)
  getRatings() {
    return axios.get(`https://mern-backend-bvcr.onrender.com/api/v1/movies/ratings`);
  }
}

// Create an instance of the service to use throughout the app
const movieDataService = new MovieDataService();

// Export the instance to be imported and used in other components
export default movieDataService;
