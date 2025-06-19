// 1. Import core dependencies
import express from 'express'          // Import Express framework
import cors from 'cors'                // Import CORS middleware to enable cross-origin requests
import movies from './api/movies.route.js'  // Import the movies route handler

// 2. Create the Express application
const app = express() // This initializes our Express server instance

// 3. Apply middleware
app.use(cors())              // Enable CORS — this lets the frontend access the backend from a different origin
app.use(express.json())      // Enable parsing of incoming JSON requests (e.g. POST requests with JSON bodies)

// 4. Define main API route
// Any request to /api/v1/movies will be handled by the movies.route.js logic
app.use("/api/v1/movies", movies)

// 5. Catch-all route for unmatched requests
// If none of the routes above match, return a 404 with a JSON error
app.use('*', (req, res) => {
  res.status(404).json({ error: "not found" })
})

// 6. Export the app so it can be used in index.js (where we connect to MongoDB and start the server)
export default app