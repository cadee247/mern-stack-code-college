import './App.css';
import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import app components
import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";

// Bootstrap components for navbar
import { Nav, Navbar } from 'react-bootstrap';

function App() {
  // Track the current logged-in user
  const [user, setUser] = React.useState(null);

  // Function to handle login
  async function login(user = null) {
    setUser(user); // Set user info in state
  }

  // Function to handle logout
  async function logout() {
    setUser(null); // Clear user from state
  }

  return (
    <div className="App">
      {/* Navigation bar at the top */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* Link to movies list */}
            <Nav.Link>
              <Link to={'/movies'}>Movies</Link>
            </Nav.Link>

            {/* Show Logout button if user is logged in, else show Login link */}
            <Nav.Link>
              {user ? (
                <button onClick={logout}>Logout User</button>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Routing for different parts of the app */}
      <Switch>
        {/* Display all movies by default */}
        <Route exact path={["/", "/movies"]} component={MoviesList} />

        {/* Form to add a review – passes current user as a prop */}
        <Route
          path="/movies/:id/review"
          render={(props) => <AddReview {...props} user={user} />}
        />

        {/* View details for a specific movie */}
        <Route
          path="/movies/:id/"
          render={(props) => <Movie {...props} user={user} />}
        />

        {/* Login page – passes login function so we can update state from child */}
        <Route
          path="/login"
          render={(props) => <Login {...props} login={login} />}
        />
      </Switch>
    </div>
  );
}

export default App;